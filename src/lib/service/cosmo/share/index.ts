import Base, { MaybeRaw } from "../../../Base";
import { Share, ShareCreate, SharePatch, ShareWithUsers } from "../../../interfaces/cosmo/share";
import { SearchFilter, Sorting } from "../../../interfaces/global";

/**
 * @class Share
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Share resource in Cosmo, providing methods to interact with the Share API.
 */
export class CosmoShare extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Share in the specified Organization and Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param createShare The Share object to create
     *
     * @returns The created Share
     */
    async createShare<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        createShare: ShareCreate,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Share>> {
        const resp = await this.axios.post<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares`), createShare);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Share>;
    }

    /**
     * Links the user to a Share, making the assets shared available to the user
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId The ID of the Share to link
     *
     * @returns The created Share
     */
    async linkShare<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        shareId: string,
        password?: string,
        shareIdHMAC?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Share>> {
        const resp = await this.axios.put<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}`), {
            password,
            shareIdHMAC,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Share>;
    }

    /**
     * Delete Shares by ID.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareIds The IDs of the Shares to delete
     *
     * @returns 204 No Content if successful
     */
    async deleteShare<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        shareIds: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares`), {
            data: { shareIds },
        });

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Fetch a Share.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId The ID of the Share to link
     *
     * @returns Detailed Share object
     */
    async fetchShare<R extends boolean = false>(orgName: string, spaceName: string, shareId: string, raw?: { raw: R }): Promise<MaybeRaw<R, Share>> {
        const res = await this.axios.get<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}`));
        return (raw?.raw ? res : res.data) as MaybeRaw<R, Share>;
    }

    /**
     * Searches for shares within a specific space in an organization.
     *
     * @param {string} orgName - The name of the organization.
     * @param {string} spaceName - The name of the space.
     * @param {{ sorting?: Sorting, filters?: SearchFilter[] }} search - Search criteria including optional sorting and filters.
     * @param {number} limit - Maximum number of results per page.
     * @param {number} page - The page number to retrieve.
     * @returns {Promise<ShareWithUsers[]>} A promise that resolves to a list of shares with their associated users.
     */
    async searchSharesOfSpace<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        search: { sorting?: Sorting; filters?: SearchFilter[] },
        limit: number,
        page: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ShareWithUsers[]>> {
        const resp = await this.axios.post<ShareWithUsers[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/search`), search, {
            params: {
                limit,
                page,
            },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ShareWithUsers[]>;
    }

    /**
     * Searches for shares the current user is linked to.
     *
     * @param {{ sorting?: Sorting, filters?: SearchFilter[] }} search - Search criteria including optional sorting and filters.
     * @param {number} limit - Maximum number of results per page.
     * @param {number} page - The page number to retrieve.
     * @returns {Promise<Share[]>} A promise that resolves to a list of shares the current user is linked to.
     */
    async searchSharesOfUser<R extends boolean = false>(
        search: { sorting?: Sorting; filters?: SearchFilter[] },
        limit: number,
        page: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Share[]>> {
        const resp = await this.axios.post<Share[]>(this.getEndpoint(`/v1/user/shares/search`), search, {
            params: {
                limit,
                page,
            },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Share[]>;
    }

    /**
     * Unlinks the current user from a specific share in a space.
     *
     * @param {string} orgName - The name of the organization.
     * @param {string} spaceName - The name of the space.
     * @param {string} shareId - The ID of the share to unlink from.
     * @returns {Promise<void>} A promise that resolves when the unlinking is complete.
     */
    async unlinkSelf<R extends boolean = false>(orgName: string, spaceName: string, shareId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/link`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Unlinks another user from a specific share in a space.
     *
     * @param {string} orgName - The name of the organization.
     * @param {string} spaceName - The name of the space.
     * @param {string} shareId - The ID of the share to unlink from.
     * @param {string} userId - The ID of the user to unlink.
     * @returns {Promise<void>} A promise that resolves when the unlinking is complete.
     */
    async unlinkOther<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        shareId: string,
        userId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/user/${userId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Links one or more users (by email) to a specific share in a space.
     *
     * @param {string} orgName - The name of the organization.
     * @param {string} spaceName - The name of the space.
     * @param {string} shareId - The ID of the share to link to.
     * @param {string[]} emails - An array of email addresses to link to the share.
     * @returns {Promise<Share>} A promise that resolves to the updated share object.
     */
    async linkOther<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        shareId: string,
        emails: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Share>> {
        const res = await this.axios.put<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/user`), { users: emails });

        return (raw?.raw ? res : res.data) as MaybeRaw<R, Share>;
    }

    /**
     * Patch a Share in the specified Organization and Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId ID of the Share
     * @param patchObject An object whose properties will be used to replace the existing Share ones
     *
     * @returns The patched Share
     */
    async patchShare<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        shareId: string,
        patchObject: SharePatch,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Share>> {
        const resp = await this.axios.patch<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}`), patchObject);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Share>;
    }
}
