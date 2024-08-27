import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { AgentVersions, Version } from "../../../interfaces/agent";
import { disableCacheHeaders } from "../../../interfaces/axios";

export class AgentBundle extends Base {
    private sourceServer: string;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.sourceServer = options.agent?.server || "https://agent.s3.helmut.cloud";
    }

    async getVersions(): Promise<AgentVersions> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/bundles/index.json"), { headers: disableCacheHeaders });

        const registry = resp.data;

        for (const v in registry.versions) {
            setDev(registry.versions[v]);
        }

        return resp.data;
    }

    async getLatestVersion(): Promise<Version> {
        const resp = await this.getVersions();

        return setDev(resp.versions[resp.latest]);
    }

    async getVersion(version: string): Promise<Version | void> {
        const resp = await this.getVersions();

        return setDev(resp.versions[version]);
    }

    protected getEndpoint(endpoint: string): string {
        return this.sourceServer + endpoint;
    }
}

function setDev(v: any): any {
    // We check false because this way if there is a problem
    // and the registry gets updated without a dev flag it will
    // be undefined and therefore considered dev since false !== undefined
    v.dev = v["dev-release"] !== false;
    delete v["dev-release"];
    return v;
}
