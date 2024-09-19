import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { Version } from "../../interfaces/global";
import BouncerFeatures from "./features";

export default class Bouncer extends Base {
    public features: BouncerFeatures;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.features = new BouncerFeatures(options, axios);
    }

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/bouncer${endpoint}`;
    }
}
