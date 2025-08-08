import Base from "../../../Base";
import { CosmoSpaceInternal } from "./space";

export class CosmoInternal extends Base {
    public get space(): CosmoSpaceInternal {
        if (this._space === undefined) {
            this._space = new CosmoSpaceInternal(this.options, this.axios);
        }
        return this._space;
    }
    private _space?: CosmoSpaceInternal;

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo/internal${endpoint}`;
    }
}
