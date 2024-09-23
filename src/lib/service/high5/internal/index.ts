import Base from "../../../Base";
import { High5SpaceInternal } from "./space";

export class High5Internal extends Base {
    public get space(): High5SpaceInternal {
        if (this._space === undefined) {
            this._space = new High5SpaceInternal(this.options, this.axios);
        }
        return this._space;
    }
    private _space?: High5SpaceInternal;

    async deleteUsers(userIds: string[]): Promise<void> {
        await this.axios.delete(this.getEndpoint("/v1/users"), { data: { userIds } });
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
