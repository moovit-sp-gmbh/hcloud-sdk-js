import Base from "../../../Base";
import { Asset, AssetFilter } from "../../../interfaces/cosmo/asset";

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
    async createSpace(orgName: string, spaceName: string, noAvatar?: boolean): Promise<CosmoSpace> {
        const resp = await this.axios.post<CosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces?noAvatar=${noAvatar ? "true" : "false"}`), {
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
    async listSpaces(orgName: string, limit: number, page: number): Promise<CosmoSpace[]> {
        const resp = await this.axios.get<CosmoSpace[]>(this.getEndpoint(`/v1/org/${orgName}/spaces?limit=${limit}&page=${page}`));

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
    async getSpace(orgName: string, spaceName: string): Promise<CosmoSpace> {
        const resp = await this.axios.get<CosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));

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
    async renameSpace(orgName: string, spaceName: string, newName: string): Promise<CosmoSpace> {
        const resp = await this.axios.patch<CosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`), {
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
    async searchAssetsInTrashOfSpace(
        orgName: string,
        spaceName: string,
        assetFilter: AssetFilter[],
        limit: number,
        page: number,
        recursive: boolean = false
    ): Promise<Asset[]> {
        const resp = await this.axios.post<Asset[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/trash/search?limit=${limit}&page=${page}&recursive=${recursive}`),
            { filters: assetFilter }
        );

        return resp.data;
    }
}
