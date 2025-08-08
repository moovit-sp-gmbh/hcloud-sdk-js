import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";

export class CosmoSpaceInternal extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Deletes all spaces of an organization and the organization itself.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgId ID of the organization
     */
    async deleteSpacesOfDeletedOrg(orgId: string): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgId}/spaces`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo/internal${endpoint}`;
    }
}
