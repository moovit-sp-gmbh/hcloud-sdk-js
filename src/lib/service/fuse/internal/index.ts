import Base from "../../../Base";
import { FuseSpaceInternal } from "./space";

export class FuseInternal extends Base {
    public get space(): FuseSpaceInternal {
        if (this._space === undefined) {
            this._space = new FuseSpaceInternal(this.options, this.axios);
        }
        return this._space;
    }
    private _space?: FuseSpaceInternal;

    async deleteUsers(userIds: string[]): Promise<void> {
        await this.axios.delete(this.getEndpoint("/v1/users"), { data: { userIds } });
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
