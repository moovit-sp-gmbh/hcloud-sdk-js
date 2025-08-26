import Base from "../../../../../Base";
import { High5JobLogInternal } from "./log";

export class High5JobInternal extends Base {
    public get jobLog(): High5JobLogInternal {
        if (this._jobLog === undefined) {
            this._jobLog = new High5JobLogInternal(this.options, this.axios);
        }
        return this._jobLog;
    }
    private _jobLog?: High5JobLogInternal;

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
