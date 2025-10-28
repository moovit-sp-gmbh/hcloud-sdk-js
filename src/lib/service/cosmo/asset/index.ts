import Base from "../../../Base";
import { Asset, AssetPermission, CreateAsset, PatchAsset, Resolution, Upload } from "../../../interfaces/cosmo/asset";
import { ReducedUser } from "../../../interfaces/idp/user";

/**
 * @class Asset
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents an Asset resource in Cosmo, providing methods to interact with the Asset API.
 */
export class CosmoAsset extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Asset in Cosmo inside the specified Organization and Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param createAsset The Asset to be created
     * @returns The created asset
     */
    async createAsset(orgName: string, spaceName: string, createAsset: CreateAsset): Promise<Asset & { upload: Upload }> {
        const resp = await this.axios.post<Asset & { upload: Upload }>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets`), createAsset);
        return resp.data;
    }

    /**
     * Bulk move or copy multiple assets to a new parent.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param newParentId (optional) ID of the new parent Asset to which the assets will be moved. Assets will be moved to the root if not provided.
     * @param assetIdList List of Asset IDs to be moved to trash
     * @param copy Whether to copy (true) or move (false) the assets
     * @returns The moved assets
     */
    async bulkMove(orgName: string, spaceName: string, assetIdList: string[], newParentId?: string, copy = false): Promise<Asset[]> {
        const resp = await this.axios.put<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/bulk-move-copy`), {
            assetIds: assetIdList,
            parentId: newParentId,
            copy: copy,
        });

        return resp.data;
    }

    /**
     * Attach an asset to a location.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId ID of the Asset to be attached
     * @param locationId ID of the Location to which the Asset will be attached to
     * @returns 204 No Content if successful
     */
    async attachAssetToLocation(orgName: string, spaceName: string, assetId: string, locationId: string): Promise<void> {
        await this.axios.patch(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/location`), {
            locationId: locationId,
        });
    }

    /**
     * Patch an asset.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId ID of the Asset to be attached
     * @param patchAsset The Asset to be patched
     * @returns The patched asset
     */
    async patchAsset(orgName: string, spaceName: string, assetId: string, patchAsset: PatchAsset): Promise<Asset> {
        const resp = await this.axios.patch<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}`), patchAsset);
        return resp.data;
    }

    /**
     * Get an asset by its ID.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId ID of the Asset to be attached
     * @param namespace Optional Namespaces of which information should be included in the returned object
     * @param includePermissions Whether to include permissions in the result or not
     * @returns The requested asset
     */
    async getAsset(orgName: string, spaceName: string, assetId: string, namespace?: string | string[], includePermissions = false): Promise<Asset> {
        const resp = await this.axios.get<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}`), {
            params: {
                namespace,
                permissions: includePermissions ? "true" : "false",
            },
        });
        return resp.data;
    }

    /**
     * Delete multiple assets permanently by their IDs.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetIds IDs of the Assets to delete
     * @param force If asset is folder and force is set to false, it will only succeed if the folder is empty. If set to true, it will always succeed, but delete all children in the process
     * @returns 204 No Content if successful
     */
    async deleteAssets(orgName: string, spaceName: string, assetIds: string[], force?: boolean): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets`), {
            data: { assetIds },
            params: { force },
        });
    }

    /**
     * Request download URLs for multiple assets.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetIdList List of Asset IDs for which download URLs are requested
     * @param resolution The desired resolution for the download URLs
     * @returns A map of Asset IDs to their download URLs
     */
    async requestDownloadUrls(orgName: string, spaceName: string, assetIdList: string[], resolution: Resolution): Promise<Record<string, string>> {
        const resp = await this.axios.post<Record<string, string>>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/downloadUrls`), {
            assetIds: assetIdList,
            resolution: resolution,
        });
        return resp.data;
    }

    /**
     * Upload an asset.
     * @remarks
     * ** Under development, breaking changes possible**
     * ** Check this endpoint for currency as it looks outdated.**
     * @param token An upload token for the asset
     * @returns The uploaded asset
     */
    async uploadAsset(token: string): Promise<Asset> {
        const resp = await this.axios.put<Asset>(this.getEndpoint(`/v1/assets/upload?${token}`));
        return resp.data;
    }

    /**
     * Move an asset to a new parent.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId ID of the Asset to be moved
     * @param newParentId (optional) ID of the new parent Asset to which the asset will be moved. The asset will be moved to the root if not provided.
     * @returns The moved asset
     */
    async moveAsset(orgName: string, spaceName: string, assetId: string, newParentId?: string): Promise<Asset> {
        const resp = await this.axios.put<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/move`), {
            parentId: newParentId,
        });
        return resp.data;
    }

    /**
     * Move assets to the trash bin.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetIdList List of Asset IDs to be moved to trash
     * @returns The moved assets
     */
    async moveAssetsToTrash(orgName: string, spaceName: string, assetIdList: string[]): Promise<Asset[]> {
        const resp = await this.axios.put<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/trash`), {
            assetIds: assetIdList,
        });

        return resp.data;
    }

    /**
     * Fetch permissions for a group of assets.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetIdList List of Asset IDs to be moved to trash
     * @returns A map of Asset IDs to their permissions
     */
    async fetchAssetPermissions(orgName: string, spaceName: string, assetIdList: string[]): Promise<Record<string, AssetPermission[]>> {
        const resp = await this.axios.post<Record<string, AssetPermission[]>>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/permissions`),
            {
                assetIds: assetIdList,
            }
        );
        return resp.data;
    }

    /**
     * Rename an asset.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId ID of the Asset to be renamed
     * @returns The renamed asset
     */
    async renameAsset(orgName: string, spaceName: string, assetId: string, newName: string): Promise<Asset> {
        const resp = await this.axios.patch<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/name`), {
            name: newName,
        });
        return resp.data;
    }

    /**
     * Move assets out of trash and therewith recover them.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetIdList List of Asset IDs to be moved out of trash
     * @returns The moved assets
     */
    async moveAssetsOutOfTrash(orgName: string, spaceName: string, assetIdList: string[]): Promise<Asset[]> {
        const resp = await this.axios.delete<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/trash`), {
            data: {
                assetIds: assetIdList,
            },
        });

        return resp.data;
    }

    /**
     * Attach a tag to an asset or replace an existing one.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId ID of the Asset to be attached
     * @param tagName Name of the tag
     * @returns The updated asset
     */
    async attachTagToAsset(orgName: string, spaceName: string, assetId: string, tagName: string): Promise<Asset> {
        const resp = await this.axios.patch<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/tags/${tagName}`));
        return resp.data;
    }

    /**
     * Remove a tag from an asset.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId ID of the Asset to be attached
     * @returns The updated asset
     */
    async removeTagFromAsset(orgName: string, spaceName: string, assetId: string): Promise<Asset> {
        const resp = await this.axios.delete<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/tags`));
        return resp.data;
    }

    /**
     * List users allowed to be mentioned in a comment of an asset.
     * @param assetId ID of the Asset
     * @param limit Maximum number of users to return
     * @param page Page number for pagination
     * @returns A list of users allowed to be mentioned in a comment of the asset
     */
    async listUsersAllowedToMention(orgName: string, spaceName: string, assetId: string, limit?: number, page?: number): Promise<ReducedUser[]> {
        const resp = await this.axios.get<ReducedUser[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/users`), {
            params: {
                limit,
                page,
            },
        });
        return resp.data;
    }
}
