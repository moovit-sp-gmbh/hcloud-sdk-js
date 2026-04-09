import { AxiosResponse } from "axios";
import Base, { MaybeRaw } from "../../../Base";
import { AuditLog } from "../../../interfaces/auditor";
import { disableCacheHeaders } from "../../../interfaces/axios";
import {
    Asset,
    AssetPermission,
    CreateAsset,
    Mentionable,
    PatchAsset,
    Resolution,
    SubscriptionFilter,
    Upload,
    VTTThumbnail,
} from "../../../interfaces/cosmo/asset";

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
    async createAsset<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        createAsset: CreateAsset,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset & { upload: Upload }>> {
        const resp = await this.axios.post<Asset & { upload: Upload }>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets`),
            createAsset
        );
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset & { upload: Upload }>;
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
    async bulkMove<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetIdList: string[],
        newParentId?: string,
        copy = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset[]>> {
        const resp = await this.axios.put<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/bulk-move-copy`), {
            assetIds: assetIdList,
            parentId: newParentId,
            copy: copy,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset[]>;
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
    async attachAssetToLocation<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetId: string,
        locationId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.patch(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/location`), {
            locationId: locationId,
        });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
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
    async patchAsset<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetId: string,
        patchAsset: PatchAsset,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset>> {
        const resp = await this.axios.patch<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}`), patchAsset);
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset>;
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
    async getAsset<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetId: string,
        namespace?: string | string[],
        includePermissions = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset>> {
        const resp = await this.axios.get<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}`), {
            params: {
                namespace,
                permissions: includePermissions ? "true" : "false",
            },
        });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset>;
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
    async deleteAssets<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetIds: string[],
        force?: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets`), {
            data: { assetIds },
            params: { force },
        });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
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
    async requestDownloadUrls<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetIdList: string[],
        resolution: Resolution,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Record<string, string>>> {
        const resp = await this.axios.post<Record<string, string>>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/downloadUrls`), {
            assetIds: assetIdList,
            resolution: resolution,
        });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Record<string, string>>;
    }

    /**
     * Upload an asset.
     * @remarks
     * ** Under development, breaking changes possible**
     * ** Check this endpoint for currency as it looks outdated.**
     * @param token An upload token for the asset
     * @returns The uploaded asset
     */
    async uploadAsset<R extends boolean = false>(token: string, raw?: { raw: R }): Promise<MaybeRaw<R, Asset>> {
        const resp = await this.axios.put<Asset>(this.getEndpoint(`/v1/assets/upload?${token}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset>;
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
    async moveAssetsToTrash<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetIdList: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset[]>> {
        const resp = await this.axios.put<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/trash`), {
            assetIds: assetIdList,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset[]>;
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
    async fetchAssetPermissions<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetIdList: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Record<string, AssetPermission[]>>> {
        const resp = await this.axios.post<Record<string, AssetPermission[]>>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/permissions`),
            {
                assetIds: assetIdList,
            }
        );
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Record<string, AssetPermission[]>>;
    }

    /**
     * Fetches the activity log for a specific asset within a given organization and space.
     *
     * @param {string} orgName - The name of the organization that owns the space.
     * @param {string} spaceName - The name of the space containing the asset.
     * @param {string} assetId - The unique identifier of the asset whose activity is being fetched.
     * @param {number} limit - The maximum number of audit log entries to retrieve per page.
     * @param {number} page - The page number to retrieve (for pagination).
     * @returns {Promise<AuditLog[]>} A promise that resolves to an array of `AuditLog` objects representing the asset’s activity history.
     */
    async fetchAssetActivity<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetId: string,
        limit: number,
        page: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AuditLog[]>> {
        const resp = await this.axios.get<AuditLog[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/activity`), {
            params: {
                limit,
                page,
            },
        });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AuditLog[]>;
    }

    /**
     * Fetches an assets VTT file and parses it to return an array of VTTThumbnail objects.
     *
     * @param {string} url - The URL of the VTT file to fetch and parse.
     * @returns {Promise<VTTThumbnail[]>} A promise that resolves to an array of `VTTThumbnail` objects representing the asset’s thumbnails.
     */
    async fetchAndParseAssetVTT<R extends boolean = false>(url: string, raw?: { raw: R }): Promise<MaybeRaw<R, VTTThumbnail[]>> {
        const resp = await this.axios.get<string>(url, {
            headers: { ...disableCacheHeaders, Authorization: undefined },
        });

        const parseTimestamp = (ts: string) => {
            const parts = ts.split(":").map(Number);
            if (parts.length === 3) {
                return parts[0] * 3600 + parts[1] * 60 + parts[2];
            }
            return parts[0] * 60 + parts[1];
        };

        const lines = resp.data.split(/\r?\n/);
        const thumbnails = [] as VTTThumbnail[];

        for (let i = 0; i < lines.length; i++) {
            const timeMatch = lines[i].match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s-->\s(\d{2}:\d{2}:\d{2}\.\d{3})/);

            if (timeMatch) {
                const start = parseTimestamp(timeMatch[1]);
                const end = parseTimestamp(timeMatch[2]);
                const imageLine = lines[i + 1]?.trim();

                if (!imageLine) continue;

                const [url, fragment] = imageLine.split("#");

                let xywh = undefined;

                if (fragment?.startsWith("xywh=")) {
                    const [x, y, w, h] = fragment.replace("xywh=", "").split(",").map(Number);

                    xywh = { x, y, w, h };
                }

                thumbnails.push({
                    start,
                    end,
                    url,
                    xywh,
                });
            }
        }

        return (raw?.raw ? resp : thumbnails) as MaybeRaw<R, VTTThumbnail[]>;
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
    async renameAsset<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetId: string,
        newName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset>> {
        const resp = await this.axios.patch<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/name`), {
            name: newName,
        });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset>;
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
    async moveAssetsOutOfTrash<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetIdList: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset[]>> {
        const resp = await this.axios.delete<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/trash`), {
            data: {
                assetIds: assetIdList,
            },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset[]>;
    }

    /**
     * Attach a tag to an asset or replace an existing one.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the namespace
     * @param assetId ID of the Asset to be attached
     * @param tagName Name of the tag
     * @returns The updated asset
     */
    async attachTagToAsset<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        assetId: string,
        tagName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset>> {
        const resp = await this.axios.patch<Asset>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/assets/${assetId}/tags/${tagName}`)
        );
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset>;
    }

    /**
     * Remove a tag from an asset.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param assetId ID of the Asset to be attached
     * @returns The updated asset
     */
    async removeTagFromAsset<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        assetId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset>> {
        const resp = await this.axios.delete<Asset>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/assets/${assetId}/tags`)
        );
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset>;
    }

    /**
     * List users allowed to be mentioned in a comment of an asset.
     * @param assetId ID of the Asset
     * @param limit Maximum number of users to return
     * @param page Page number for pagination
     * @returns A list of users allowed to be mentioned in a comment of the asset
     */

    async listUsersAllowedToMention<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetId: string,
        limit?: number,
        page?: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Mentionable[]>> {
        const resp = await this.axios.get<Mentionable[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/users`), {
            params: { limit, page },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Mentionable[]>;
    }

    /**
     * Clone one or more assets within a space.
     *
     * This operation creates copies of the specified assets in the same organization and space.
     *
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetIds List of Asset IDs to be cloned. If folder IDs are specified, they will be recursively cloned.
     * @param parentId (optional) Id of parent asset of the newly cloned asset. If undefined will default to space as parent.
     * @returns The cloned assets
     */
    async cloneAsset<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetIds: string[],
        parentId?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset[]>> {
        const resp = await this.axios.put<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/clone`), { assetIds, parentId });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset[]>;
    }

    /**
     * Subscribe to notifications for a specific asset or all assets in a space.
     *
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId (optional) ID of the Asset to subscribe to. If not provided, subscribes to the space.
     * @param filters (optional) Subscription configuration. If 'filters' is omitted or empty, all notification types will be sent.
     * @param raw
     * @returns 204 No Content if successful
     */
    async subscribe<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        assetId?: string,
        filters?: SubscriptionFilter[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        let resp: AxiosResponse;
        if (assetId) {
            resp = await this.axios.put<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/subscribe`), { filters });
        } else {
            resp = await this.axios.put<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/subscribe`), { filters });
        }
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    /**
     * Unsubscribe from notifications for a specific asset or all assets in a space.
     *
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetId (optional) ID of the Asset to unsubscribe from. If not provided, unsubscribes from the space.
     * @returns 204 No Content if successful
     */
    async unsubscribe<R extends boolean = false>(orgName: string, spaceName: string, assetId?: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        let resp: AxiosResponse;
        if (assetId) {
            resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/${assetId}/subscribe`));
        } else {
            resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/assets/subscribe`));
        }
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }
}
