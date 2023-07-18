import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../base";
import High5Secret from "./High5Secret";

export default class High5SpaceSettings extends Base {
    /**
     * Handles encrypted values associated with High5 spaces.
     */
    public secrets: High5Secret;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.secrets = new High5Secret(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        throw new Error("Method not implemented.");
    }
}
