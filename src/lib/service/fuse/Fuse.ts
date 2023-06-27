import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { Version } from "../../interfaces/Global";
import { FuseSpace } from "./FuseSpace";
import { FuseInternal } from "./FuseInternal";
import { FuseSpaceInternal } from "./FuseSpaceInternal";

export default class Fuse extends base {
    public space: FuseSpace;
    public internal: FuseInternal;
    public spaceInternal: FuseSpaceInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.space = new FuseSpace(this.options, this.axios);
        this.spaceInternal = new FuseSpaceInternal(this.options, this.axios);
        this.internal = new FuseInternal(this.options, this.axios);
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
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
