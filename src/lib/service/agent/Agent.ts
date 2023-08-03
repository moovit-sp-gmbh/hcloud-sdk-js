import { AxiosInstance } from "axios";
import Base, { Options } from "../../base";
import { AgentVersions, Version } from "../../interfaces/Agent";

export default class Agent extends Base {
    private sourceServer: string;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.sourceServer = options.agent?.server || "https://pub-61bccb93b9a74709b6bfcb0b7c03191b.r2.dev";
    }

    async getVersions(): Promise<AgentVersions> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/agentVersions.json"));

        return resp.data;
    }

    async getLatestVersion(): Promise<Version> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/agentVersions.json"));

        return resp.data.versions[resp.data.latest];
    }

    async getVersion(version: string): Promise<Version | void> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/agentVersions.json"));

        return resp.data.versions[version];
    }

    protected getEndpoint(endpoint: string): string {
        return this.sourceServer + endpoint;
    }
}
