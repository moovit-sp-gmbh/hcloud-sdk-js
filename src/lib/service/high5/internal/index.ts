import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";

export class High5Internal extends Base {
    async deleteUsers(userIds: string[]): Promise<void> {
        await this.axios.delete(this.getEndpoint("/v1/users"), { data: { userIds } });
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
