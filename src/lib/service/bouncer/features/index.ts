import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { HcloudFeature } from "../../../interfaces/bouncer";

export default class BouncerFeatures extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    async getHcloudFeatures(): Promise<HcloudFeature[]> {
        const resp = await this.axios.get<HcloudFeature[]>(this.getEndpoint("/v1/feature/hcloud"), {});

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/bouncer${endpoint}`;
    }
}
