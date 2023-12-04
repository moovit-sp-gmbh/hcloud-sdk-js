import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { Version } from "../../interfaces/global";
import { Agent } from "../../interfaces/mothership";

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
     * @param uuidSignature HMAC-SHA256 hash of the Agent's UUID using the Agent's secret as the key
     * @param info Information about the agent's uuid, hardware and nickname
     * @return an Agent object
     */
    hello = async (uuid: string, uuidSignature: string, info: RecurrentInfo & { nickname?: string }): Promise<{ agent: Agent; token: string }> => {
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
    helloAgain = async (info: RecurrentInfo): Promise<Agent> => {
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
        info: Pick<Agent, Exclude<keyof Agent, "uuid" | "createDate" | "modifyDate" | "_id" | "ip">>,
        publicKey: string | Buffer
    ): Promise<{ secret: string }> => {
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
