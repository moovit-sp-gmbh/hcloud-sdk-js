import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { AgentVersions, Version } from "../../interfaces/agent";

export default class Agent extends Base {
    private sourceServer: string;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.sourceServer = options.agent?.server || "https://agent.s3.helmut.cloud";
    }

    async getVersions(): Promise<AgentVersions> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/index.json"));

        return resp.data;
    }

    async getLatestVersion(): Promise<Version> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/index.json"));

        return resp.data.versions[resp.data.latest];
    }

    async getVersion(version: string): Promise<Version | void> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/index.json"));

        return resp.data.versions[version];
    }

    protected getEndpoint(endpoint: string): string {
        return this.sourceServer + endpoint;
    }
}
