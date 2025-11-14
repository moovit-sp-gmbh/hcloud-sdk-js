import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../../Base";

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
    async deleteSpacesOfDeletedOrg<R extends boolean = false>(orgId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgId}/spaces`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo/internal${endpoint}`;
    }
}
