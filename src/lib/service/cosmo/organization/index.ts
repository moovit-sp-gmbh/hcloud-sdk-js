import Base from "../../../Base";
import { Asset, AssetFilter, AssetSearchContext } from "../../../interfaces/cosmo/asset";
import { Sorting } from "../../../interfaces/global";

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
     * @param context Context to search in (e.g., ORGANIZATION, TRASH, SHARE)
     * @param limit Maximum number of Assets to return
     * @param page Page number for pagination
     * @param recursive Flag for searching recursively
     * @param spaceName Name of Space to restrict search (mandatory if context is not ORGANIZATION)
     * @param namespace Name of Namespace to restrict search
     * @param parentId ID of parent (folder, etc.) to restrict search
     * @param shareId ID of Share to restrict search (mandatory if context is SHARE)
     * @param assetFilter Filter criteria for Assets
     * @param sorting Sorting criteria for the results
     * @returns List of found Assets
     */
    async searchAssets({
        orgName,
        context,
        limit,
        page,
        recursive = false,
        spaceName,
        namespace,
        parentId,
        shareId,

        assetFilter,
        sorting,
    }: {
        orgName: string;
        context: AssetSearchContext;
        limit?: number;
        page?: number;
        recursive?: boolean;
        spaceName?: string;
        namespace?: string[] | string;
        parentId?: string;
        shareId?: string;

        assetFilter?: AssetFilter[];
        sorting?: Sorting;
    }): Promise<Asset[]> {
        limit = limit ?? 100;
        page = page ?? 0;

        const resp = await this.axios.post<Asset[]>(
            this.getEndpoint(`/v1/org/${orgName}/assets/search`),
            {
                filters: assetFilter ?? [],
                ...(sorting ? { sorting } : {}),
            },
            {
                params: {
                    context,
                    limit,
                    page,
                    recursive,
                    spaceName,
                    namespace,
                    parentId,
                    shareId
                },
            }
        );

        return resp.data;
    }
}
