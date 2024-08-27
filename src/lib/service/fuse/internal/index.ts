import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { FuseSpaceInternal } from "./space";

export class FuseInternal extends Base {
    public space: FuseSpaceInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.space = new FuseSpaceInternal(options, axios);
    }

    async deleteUsers(userIds: string[]): Promise<void> {
        await this.axios.delete(this.getEndpoint("/v1/users"), { data: { userIds } });
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
