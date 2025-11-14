import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../Base";
import { HcloudFeature } from "../../../interfaces/bouncer";

export default class BouncerFeatures extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    async getHcloudFeatures<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, HcloudFeature[]>> {
        const resp = await this.axios.get<HcloudFeature[]>(this.getEndpoint("/default.json"), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, HcloudFeature[]>;
    }

    protected getEndpoint(endpoint: string): string {
        return `https://config.s3.helmut.cloud/featureflags${endpoint}`;
    }
}
