import Base from "../../../Base";
import { Asset, AssetFilter } from "../../../interfaces/cosmo/asset";

/**
 * @class Organization
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents an Organization resource in Cosmo, providing methods to interact with the Organization API.
 */
export class CosmoOrganization extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Search Assets of an Organization across all Spaces
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param assetFilter Filter criteria for Assets
     * @param limit Maximum number of Assets to return
     * @param page Page number for pagination
     * @returns List of found Assets
     */
    async searchAssets(orgName: string, assetFilter: AssetFilter, limit: number, page: number): Promise<Asset[]> {
        const resp = await this.axios.post<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/assets?limit=${limit}&page=${page}`), {
            filters: assetFilter,
        });

        return resp.data;
    }
}
