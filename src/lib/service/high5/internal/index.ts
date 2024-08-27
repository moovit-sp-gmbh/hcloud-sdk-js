import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { High5SpaceInternal } from "./space";

export class High5Internal extends Base {
    public space: High5SpaceInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.space = new High5SpaceInternal(options, axios);
    }

    async deleteUsers(userIds: string[]): Promise<void> {
        await this.axios.delete(this.getEndpoint("/v1/users"), { data: { userIds } });
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
