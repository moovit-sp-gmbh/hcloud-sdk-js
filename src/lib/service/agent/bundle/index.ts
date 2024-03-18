import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { AgentVersions, Version } from "../../../interfaces/agent";

export class AgentBundle extends Base {
    private sourceServer: string;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.sourceServer = options.agent?.server || "https://agent.s3.helmut.cloud";
    }

    async getVersions(): Promise<AgentVersions> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/bundles/index.json"));

        return resp.data;
    }

    async getLatestVersion(): Promise<Version> {
        const resp = await this.getVersions();

        return resp.versions[resp.latest];
    }

    async getVersion(version: string): Promise<Version | void> {
        const resp = await this.getVersions();

        return resp.versions[version];
    }

    protected getEndpoint(endpoint: string): string {
        return this.sourceServer + endpoint;
    }
}
