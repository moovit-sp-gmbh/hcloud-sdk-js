import * as os from "os";
import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { Version } from "../../interfaces/global";
import { Agent } from "../../interfaces/mothership";

/**
 * Get average CPU utilization over 1 second.
 */
function getCPUInfo(): Promise<{ model: string; utilization: number }> {
    return new Promise(function (resolve) {
        const startCpus = os.cpus();

        setTimeout(function () {
            let startIdle = 0;
            let startTotal = 0;
            for (const cpu of startCpus) {
                startIdle += cpu.times.idle;
                for (const timeType in cpu.times) {
                    startTotal += cpu.times[timeType as keyof typeof cpu.times];
                }
            }
            const endCpus = os.cpus();
            let endIdle = 0;
            let endTotal = 0;
            for (const cpu of endCpus) {
                endIdle += cpu.times.idle;
                for (const timeType in cpu.times) {
                    endTotal += cpu.times[timeType as keyof typeof cpu.times];
                }
            }
            const idleDifference = endIdle - startIdle;
            const totalDifference = endTotal - startTotal;

            const cpuPercentage = Math.trunc(((totalDifference - idleDifference) / totalDifference) * 100);

            return resolve({ model: startCpus[0].model, utilization: cpuPercentage });
        }, 1000);
    });
}

type HelloExcludedKeys = "status" | "createDate" | "modifyDate";
type HelloMandatoryKeys = "nickname" | "uuid";

type HelloAgainOptionalKeys = "nickname";
type HelloAgainMandatoryKeys = "uptime" | "uuid" | "cpuUtilization" | "memoryUsed";

export default class MothershipService extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return resp.data;
    };

    /**
     * Say hello as an agent to the mothership
     *
     * @param info Information about the agent's uuid, hardware and nickname
     * @param publicKey the public key of the agent that will be used for cryptography. The agent should remember its private key
     * @return an Agent object
     */
    // eslint-disable-next-line complexity
    hello = async (
        info: Partial<Pick<Agent, Exclude<keyof Agent, HelloExcludedKeys>>> & Pick<Agent, HelloMandatoryKeys>,
        publicKey: string | Buffer
    ): Promise<Agent> => {
        if (typeof window !== "undefined" && window !== null)
            throw new Error("The hello endpoint should only called by an HCloud agent and not from a browser page.");

        if (!info.cpu) {
            const { model, utilization } = await getCPUInfo();
            info.cpu = model;
            info.cpuUtilization = utilization;
        } else if (!info.cpuUtilization) info.cpuUtilization = (await getCPUInfo()).utilization;
        if (!info.uptime) info.uptime = os.uptime();
        if (!info.hostname) info.hostname = os.hostname();
        if (!info.memoryTotal) info.memoryTotal = os.totalmem();
        if (!info.memoryUsed) info.memoryUsed = info.memoryTotal - os.freemem();
        if (!info.osPlatform) info.osPlatform = os.platform();
        if (!info.osRelease) info.osRelease = os.release();
        if (!info.osVersion) info.osVersion = os.version();

        if (typeof publicKey !== "string") {
            publicKey = publicKey.toString("hex");
        }

        const resp = await this.axios.post<Agent>(this.getEndpoint("/v1/hello"), { publicKey, ...info });

        return resp.data;
    };

    /**
     * Say hello again as an agent to the mothership.
     *
     * This call should only be made after an initial hello.
     *
     * @param info Information about the agent's uuid, hardware and nickname
     * @param publicKey (optional) the public key of the agent that will be used for cryptography. The agent should remember its private key
     * @return an Agent object
     */
    helloAgain = async (
        info: Partial<Pick<Agent, HelloAgainOptionalKeys>> & Required<Pick<Agent, HelloAgainMandatoryKeys>>,
        publicKey?: string | Buffer
    ): Promise<Agent> => {
        if (typeof window !== "undefined" && window !== null)
            throw new Error("The helloAgain endpoint should only called by an HCloud agent and not from a browser page.");

        if (!info.cpuUtilization) info.cpuUtilization = (await getCPUInfo()).utilization;
        if (!info.uptime) info.uptime = os.uptime();
        if (!info.memoryUsed) info.memoryUsed = os.totalmem() - os.freemem();

        if (publicKey && typeof publicKey !== "string") {
            publicKey = publicKey.toString("hex");
        }

        const resp = await this.axios.patch<Agent>(this.getEndpoint("/v1/hello/again"), { publicKey, ...info });

        return resp.data;
    };

    /**
     * Say goodbye as an agent to the mothership.
     *
     * This call should only be made after an initial hello.
     *
     * @param uuid UUID of the agent
     * @return an Agent object
     */
    goodbye = async (uuid: string): Promise<Agent> => {
        if (typeof window !== "undefined" && window !== null)
            throw new Error("The goodbye endpoint should only called by an HCloud agent and not from a browser page.");

        const resp = await this.axios.post<Agent>(this.getEndpoint("/v1/goodbye"), { uuid });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/mothership${endpoint}`;
    }
}
