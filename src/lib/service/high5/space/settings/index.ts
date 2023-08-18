import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import High5Secret from "./secret";

export default class High5SpaceSettings extends Base {
    /**
     * Handles encrypted values associated with High5 spaces.
     */
    public secrets: High5Secret;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.secrets = new High5Secret(this.options, this.axios);
    }

    protected getEndpoint(): string {
        throw new Error("Method not implemented.");
    }
}
