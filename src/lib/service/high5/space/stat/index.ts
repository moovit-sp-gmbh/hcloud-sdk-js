import Base from "../../../../Base";
import { Stats } from "../../../../interfaces/high5/stats";

export class High5SpaceStat extends Base {
    /**
     * Retrieves usage statistics for a specific space.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @returns Statistics information
     */
    async getStats(orgName: string, spaceName: string): Promise<Stats> {
        const resp = await this.axios.get<Stats>(this.getEndpoint(`/org/${orgName}/spaces/${spaceName}/stats`));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/v1${endpoint}`;
    }
}
