import Base from "../../../Base"
import { Asset, AssetFilter } from "../../../interfaces/cosmo/asset"
import { Folder } from "../../../interfaces/cosmo/folder"
import { Sorting } from "../../../interfaces/global"

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
     * @param spaceName Name of Space to restrict search space
     * @param parentId ID of parent (folder, etc.) to restrict search space
     * @param assetFilter Filter criteria for Assets
     * @param limit Maximum number of Assets to return
     * @param page Page number for pagination
     * @param recursive Flag for searching recursively
     * @returns List of found Assets
     */
    async searchAssets({
        orgName,
        spaceName,
        parentId,
        assetFilter,
        sorting,
        limit,
        page,
        recursive = false,
        namespace,
    }: {
        orgName: string;
        spaceName?: string;
        parentId?: string;
        assetFilter?: AssetFilter[];
        sorting?: Sorting;
        limit?: number;
        page?: number;
        recursive?: boolean;
        namespace?: string[] | string;
    }): Promise<(Asset | Folder)[]> {
        limit = limit ?? 100;
        page = page ?? 0;

        const resp = await this.axios.post<(Asset | Folder)[]>(
            this.getEndpoint(`/v1/org/${orgName}/assets/search`),
            {
                filters: assetFilter ?? [],
                ...(sorting ? { sorting } : {}),
            },
            {
                params: {
                    limit,
                    page,
                    spaceName,
                    parentId,
                    recursive,
                    namespace,
                },
            }
        );

        return resp.data;
    }
}
