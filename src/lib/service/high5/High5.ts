import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { Version } from "../../interfaces/Global";
import { High5Space } from "./High5Space";
import { High5SpaceInternal } from "./High5SpaceInternal";
import { High5Wave } from "./High5Wave";

export default class High5 extends base {
    public space: High5Space;
    public spaceInternal: High5SpaceInternal;
    public wave: High5Wave;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.space = new High5Space(this.options, this.axios);
        this.spaceInternal = new High5SpaceInternal(this.options, this.axios);
        this.wave = new High5Wave(this.options, this.axios);
    }

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
