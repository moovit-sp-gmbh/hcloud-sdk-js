import Base from "../../../Base";
import { Stats } from "../../../interfaces/high5/stats";

export class High5OrgStat extends Base {
    /**
     * Retrieves usage statistics for a specific organization.
     * @param orgName Name of the organization
     * @returns Statistics information
     */
    async getStats(orgName: string): Promise<Stats> {
        const resp = await this.axios.get<Stats>(this.getEndpoint(`/org/${orgName}/stats`));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/v1${endpoint}`;
    }
}
