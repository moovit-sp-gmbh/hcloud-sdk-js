import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { FuseCronjobLogInternal } from "./log";

export class FuseCronjobInternal extends Base {
    public cronjobLog: FuseCronjobLogInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjobLog = new FuseCronjobLogInternal(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
