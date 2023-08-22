import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { Version } from "../../interfaces/global";
import { High5Space } from "./space";
import { High5SpaceInternal } from "./internal/space";
import { High5Wave } from "./wave";

export default class High5 extends Base {
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
     * Requests the endpoint version
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
