import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../Base";
import { AgentVersions, Version } from "../../../interfaces/agent";
import { disableCacheHeaders } from "../../../interfaces/axios";

export class AgentBundle extends Base {
    private sourceServer: string;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.sourceServer = options.agent?.server || "https://agent.s3.helmut.cloud";
    }

    async getVersions<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, AgentVersions>> {
        const resp = await this.axios.get<AgentVersions>(this.getEndpoint("/bundles/index.json"), { headers: disableCacheHeaders });

        const registry = resp.data;

        for (const v in registry.versions) {
            setDev(registry.versions[v]);
        }

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AgentVersions>;
    }

    async getLatestVersion<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, Version>> {
        const resp = await this.getVersions();

        return (raw?.raw ? { ...resp, data: setDev(resp.versions[resp.latest]) } : setDev(resp.versions[resp.latest])) as MaybeRaw<R, Version>;
    }

    async getVersion<R extends boolean = false>(version: string, raw?: { raw: R }): Promise<MaybeRaw<R, Version | void>> {
        const resp = await this.getVersions();

        return (raw?.raw ? { ...resp, data: setDev(resp.versions[version]) } : setDev(resp.versions[version])) as MaybeRaw<R, Version | void>;
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
