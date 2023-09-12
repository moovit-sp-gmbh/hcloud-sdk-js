import Base, { Options } from "../../Base";
import { AxiosInstance } from "axios";
import { Version } from "../../interfaces/global";
import { FuseSpace } from "./space";
import { FuseInternal } from "./internal";
import { FuseSpaceInternal } from "./internal/space";

export default class Fuse extends Base {
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
     * @returns Object containing the version as a string
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
