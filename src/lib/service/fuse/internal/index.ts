import Base, { MaybeRaw } from "../../../Base";
import { FuseSpaceInternal } from "./space";

export class FuseInternal extends Base {
    public get space(): FuseSpaceInternal {
        if (this._space === undefined) {
            this._space = new FuseSpaceInternal(this.options, this.axios);
        }
        return this._space;
    }
    private _space?: FuseSpaceInternal;

    async deleteUsers<R extends boolean = false>(userIds: string[], raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint("/v1/users"), { data: { userIds } });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
