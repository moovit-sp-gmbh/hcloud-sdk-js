import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { Version } from "../../interfaces/global";
import { Agent } from "../../interfaces/mothership";

const crypto =
    typeof window !== "undefined" && window !== null
        ? Promise.reject(new Error("The crypto module can only be used in a Node.js runtime and not on a browser page."))
        : import("crypto");
const os =
    typeof window !== "undefined" && window !== null
        ? Promise.reject(new Error("The os module can only be used in a Node.js runtime and not on a browser page."))
        : import("os");

/**
 * Get average CPU utilization over 1 second.
 */
async function getCPUInfo(): Promise<{ model: string; utilization: number }> {
    const { cpus } = await os;

    return new Promise(function (resolve) {
        const startCpus = cpus();

        setTimeout(function () {
            let startIdle = 0;
            let startTotal = 0;
            for (const cpu of startCpus) {
                startIdle += cpu.times.idle;
                for (const timeType in cpu.times) {
                    startTotal += cpu.times[timeType as keyof typeof cpu.times];
                }
            }
            const endCpus = cpus();
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

type RecurrentInfo = Pick<Agent, "uptime" | "cpuUtilization" | "memoryUsed">;

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
     * @param uuid Agent's UUID
     * @param secret Agent's secret
     * @param info Information about the agent's uuid, hardware and nickname
     * @return an Agent object
     */
    hello = async (
        uuid: string,
        secret: Buffer,
        info: Partial<RecurrentInfo> & { nickname?: string } = {}
    ): Promise<{ agent: Agent; token: string }> => {
        const { createHmac, createSecretKey } = await crypto;
        const { uptime, totalmem, freemem } = await os;

        if (!info.cpuUtilization) info.cpuUtilization = (await getCPUInfo()).utilization;
        if (!info.uptime) info.uptime = uptime();
        if (!info.memoryUsed) info.memoryUsed = totalmem() - freemem();

        const uuidSignature = createHmac("sha256", createSecretKey(secret)).update(uuid).digest("base64");

        const resp = await this.axios.post<Agent>(this.getEndpoint("/v1/hello"), info, {
            headers: {
                Authorization: `Bearer ${uuid}.${uuidSignature}`,
            },
        });

        return { agent: resp.data, token: resp.headers.authorization };
    };

    /**
     * Say hello again as an agent to the mothership.
     *
     * This call should only be made after an initial hello.
     *
     * The session token obtained in the hello endpoint must be used here. Use the setAuthToken method to do so.
     *
     * @param info Information about the agent's system resources.
     * @return an Agent object
     */
    helloAgain = async (info: Partial<RecurrentInfo> = {}): Promise<Agent> => {
        const { uptime, totalmem, freemem } = await os;

        if (!info.cpuUtilization) info.cpuUtilization = (await getCPUInfo()).utilization;
        if (!info.uptime) info.uptime = uptime();
        if (!info.memoryUsed) info.memoryUsed = totalmem() - freemem();

        const resp = await this.axios.patch<Agent>(this.getEndpoint("/v1/hello/again"), info);

        return resp.data;
    };

    /**
     * Register an agent to the mothership.
     *
     * This call should only be made once per agent, not once per agent session.
     *
     * @param uuid UUID of the Agent
     * @param info Information about the agent's hardware and nickname.
     * @param publicKey the public key of the agent that will be used for cryptography. The agent should remember its private key.
     * @return an object holding a secret encrypted with the public key. The agent must decrypt it using its private key in order to use the /hello endpoint.
     */
    // eslint-disable-next-line complexity
    register = async (
        uuid: string,
        info: Partial<Pick<Agent, Exclude<keyof Agent, "uuid" | "createDate" | "modifyDate" | "_id" | "ip">>> & Required<Pick<Agent, "nickname">>,
        publicKey: string | Buffer
    ): Promise<{ secret: string }> => {
        const { uptime, hostname, totalmem, freemem, platform, release, version } = await os;

        if (!info.cpu) {
            const { model, utilization } = await getCPUInfo();
            info.cpu = model;
            info.cpuUtilization = utilization;
        } else if (!info.cpuUtilization) info.cpuUtilization = (await getCPUInfo()).utilization;
        if (!info.uptime) info.uptime = uptime();
        if (!info.hostname) info.hostname = hostname();
        if (!info.memoryTotal) info.memoryTotal = totalmem();
        if (!info.memoryUsed) info.memoryUsed = info.memoryTotal - freemem();
        if (!info.osPlatform) info.osPlatform = platform();
        if (!info.osRelease) info.osRelease = release();
        if (!info.osVersion) info.osVersion = version();

        if (typeof publicKey !== "string") {
            publicKey = publicKey.toString("hex");
        }

        const resp = await this.axios.post<{ secret: string }>(this.getEndpoint("/v1/register"), { uuid, publicKey, ...info });

        return resp.data;
    };

    /**
     * Connect to an organization.
     *
     * This call should only be made after an initial hello.
     *
     * The session token obtained in the hello endpoint must be used here. Use the setAuthToken method to do so.
     *
     * @param orgName Name of the organization
     * @param memberToken JWT assigned to a member of the organization
     * @param email Email of the user owner of the JWT
     */
    connect = async (orgName: string, memberToken: string, email: string): Promise<void> => {
        await this.axios.post<void>(this.getEndpoint(`/v1/org/${orgName}/connect`), { memberToken, email });
    };

    /**
     * Disconnect from an organization.
     *
     * This call should only be made after an initial hello and connect to the same organization.
     *
     * The session token obtained in the hello endpoint must be used here. Use the setAuthToken method to do so.
     *
     * @param orgName Name of the organization
     */
    disconnect = async (orgName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint("/v1/disconnect"), { data: { orgName } });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/mothership${endpoint}`;
    }
}
