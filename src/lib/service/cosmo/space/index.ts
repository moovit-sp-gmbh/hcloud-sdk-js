import Base from "../../../Base";
import { Asset, AssetFilter } from "../../../interfaces/cosmo/asset";
import { High5SpaceInfo, CosmoSpace as ICosmoSpace } from "../../../interfaces/cosmo/space";
import { Sorting } from "../../../interfaces/global";

/**
 * @class Space
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Space resource in Cosmo, providing methods to interact with the Space API.
 */
export class CosmoSpace extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Space in the specified Organization.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param noAvatar Optional flag to create the Space without an avatar
     * @returns The created Space
     */
    async createSpace(orgName: string, spaceName: string, noAvatar?: boolean): Promise<ICosmoSpace> {
        const resp = await this.axios.post<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces?noAvatar=${noAvatar ? "true" : "false"}`), {
            name: spaceName,
        });

        return resp.data;
    }

    /**
     * List spaces of an Organization.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param limit Maximum number of Spaces to return
     * @param page Page number for pagination
     * @returns A list of Spaces in the Organization
     */
    async listSpaces(orgName: string, limit: number, page: number): Promise<ICosmoSpace[]> {
        const resp = await this.axios.get<ICosmoSpace[]>(this.getEndpoint(`/v1/org/${orgName}/spaces?limit=${limit}&page=${page}`));

        return resp.data;
    }

    /**
     * Fetch a single space by its Name.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space to fetch
     * @returns The requested Space
     */
    async getSpace(orgName: string, spaceName: string): Promise<ICosmoSpace> {
        const resp = await this.axios.get<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));

        return resp.data;
    }

    /**
     * Delete a Space by it's Name.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space to delete
     * @returns 204 No Content on success
     */
    async deleteSpace(orgName: string, spaceName: string): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));
    }

    /**
     * Rename a Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param newName New name for the Space
     * @returns The updated Space
     */
    async renameSpace(orgName: string, spaceName: string, newName: string): Promise<ICosmoSpace> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/name`), {
            name: newName,
        });

        return resp.data;
    }

    /**
     * Search assets in trash inside a Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetFilter Filter for assets in the Space
     * @param limit Maximum number of assets to return
     * @param page Page number for pagination
     * @param recursive Optional flag to search recursively
     * @returns The updated Space
     */
    async searchAssetsInTrashOfSpace({
        orgName,
        spaceName,
        assetFilter,
        sorting,
        limit,
        page,
        recursive = false,
    }: {
        orgName: string;
        spaceName: string;
        assetFilter: AssetFilter[];
        sorting?: Sorting;
        limit?: number;
        page?: number;
        recursive?: boolean;
    }): Promise<Asset[]> {
        limit = limit ?? 100;
        page = page ?? 0;
        const resp = await this.axios.post<Asset[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/trash/search?limit=${limit}&page=${page}&recursive=${recursive}`),
            {
                ...(assetFilter ? { filters: assetFilter } : {}),
                ...(sorting ? { sorting: sorting } : {}),
            }
        );

        return resp.data;
    }

    /**
     * Link a high5 space to a cosmo space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Cosmo Space
     * @param high5SpaceInfo Information about the high5 space
     * @returns The updated Cosmo Space
     */
    async linkSpace(orgName: string, spaceName: string, high5SpaceInfo: High5SpaceInfo): Promise<ICosmoSpace> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/high5/link/space`), high5SpaceInfo);

        return resp.data;
    }

    /**
     * Link a high5 space to a cosmo space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Cosmo Space
     * @param high5SpaceInfo Information about the high5 space
     * @returns The updated Cosmo Space
     */
    async unlinkSpace(orgName: string, spaceName: string): Promise<ICosmoSpace> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/high5/unlink/space`));

        return resp.data;
    }
}
