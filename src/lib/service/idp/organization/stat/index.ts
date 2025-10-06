import Base from "../../../../Base";
import { Stats } from "../../../../interfaces/idp/organization/stats";

export class IdpOrganizationStat extends Base {
    /**
     * Retrieves usage statistics for a specific organization.
     * @param orgName Name of the organization
     * @returns Statistics information
     */
    async getStats(orgName: string): Promise<Stats> {
        const resp = await this.axios.get<Stats>(this.getEndpoint(`/${orgName}/stats`));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
