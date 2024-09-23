import Base from "../../../../../Base";
import { FuseCronjobLogInternal } from "./log";

export class FuseCronjobInternal extends Base {
    public get cronjobLog(): FuseCronjobLogInternal {
        if (this._cronjobLog === undefined) {
            this._cronjobLog = new FuseCronjobLogInternal(this.options, this.axios);
        }
        return this._cronjobLog;
    }
    private _cronjobLog?: FuseCronjobLogInternal;

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
