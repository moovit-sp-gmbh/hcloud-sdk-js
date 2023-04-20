import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { CronjobLogCreation, CronjobLogDto } from "../../interfaces/Fuse";
import { FuseAppInternal } from "./FuseAppInternal";

export class FuseInternal extends base {
    public app: FuseAppInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.app = new FuseAppInternal(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
