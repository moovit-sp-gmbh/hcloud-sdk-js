import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { Version } from "../../interfaces/Global";
import { FuseApp } from "./FuseApp";
import { FuseAppInternal } from "./FuseAppInternal";

export default class Fuse extends base {
    public app: FuseApp;
    public appInternal: FuseAppInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.app = new FuseApp(this.options, this.axios);
        this.appInternal = new FuseAppInternal(this.options, this.axios);
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
