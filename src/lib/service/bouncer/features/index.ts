import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { HcloudFeature } from "../../../interfaces/bouncer";

export default class BouncerFeatures extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    async getHcloudFeatures(): Promise<HcloudFeature[]> {
        const resp = await this.axios.get<HcloudFeature[]>(this.getEndpoint("/default.json"), {});

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `https://config.s3.helmut.cloud/featureflags${endpoint}`;
    }
}
