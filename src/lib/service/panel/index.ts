import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../Base";
import { disableCacheHeaders } from "../../interfaces/axios";
import { PanelVersions } from "../../interfaces/panel";

export default class PanelService extends Base {
    private sourceServer: string;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.sourceServer = options.panel?.server || "https://cosmo-panel.s3.helmut.cloud";
    }

    async getVersions<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, PanelVersions>> {
        const resp = await this.axios.get<PanelVersions>(this.getEndpoint("/index.json"), { headers: disableCacheHeaders });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, PanelVersions>;
    }

    protected getEndpoint(endpoint: string): string {
        return this.sourceServer + endpoint;
    }
}
