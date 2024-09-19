import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { Version } from "../../interfaces/global";
import { High5OrganizationExecute } from "./execution";
import { High5Internal } from "./internal";
import { High5JoinToken } from "./joinToken";
import { High5Space } from "./space";
import { High5Wave } from "./wave";

export default class High5 extends Base {
    public space: High5Space;
    public internal: High5Internal;
    public wave: High5Wave;
    public joinToken: High5JoinToken;
    public execution: High5OrganizationExecute;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.space = new High5Space(this.options, this.axios);
        this.internal = new High5Internal(this.options, this.axios);
        this.wave = new High5Wave(this.options, this.axios);
        this.joinToken = new High5JoinToken(this.options, this.axios);
        this.execution = new High5OrganizationExecute(this.options, this.axios);
    }

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
