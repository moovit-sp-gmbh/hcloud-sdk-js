import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { FuseCronjobLogInternal } from "./log/FuseCronjobLogInternal";

export class FuseCronjobInternal extends base {
    public cronjobLog: FuseCronjobLogInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjobLog = new FuseCronjobLogInternal(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
