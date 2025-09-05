import Base from "../../../Base";
import { Asset } from "../../../interfaces/cosmo/asset";
import { Folder } from "../../../interfaces/cosmo/folder";
import { Share, ShareCreate, ShareDetails, ShareWithUsers } from "../../../interfaces/cosmo/share";
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
    async createShare(orgName: string, spaceName: string, createShare: ShareCreate): Promise<Share> {
        const resp = await this.axios.post<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares`), createShare);

        return resp.data;
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
    async linkShare(orgName: string, spaceName: string, shareId: string, password?: string, shareIdHMAC?: string): Promise<Share> {
        const resp = await this.axios.put<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}`), {
            password,
            shareIdHMAC,
        });

        return resp.data;
    }

    /**
     * Fetch shared Assets.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId The ID of the Share to link
     * @param limit The number of assets to return
     * @param page The page number to return
     * @param namespace The namespace to filter by
     *
     * @returns The created Share
     */
    async fetchSharedAssets(
        orgName: string,
        spaceName: string,
        shareId: string,
        limit: number,
        page: number,
        namespace: string
    ): Promise<(Asset | Folder)[]> {
        const resp = await this.axios.get<(Asset | Folder)[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/assets?limit=${limit}&page=${page}&namespace=${namespace}`)
        );

        return resp.data;
    }

    /**
     * Delete a Share.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId The ID of the Share to link
     *
     * @returns 204 No Content if successful
     */
    async deleteShare(orgName: string, spaceName: string, shareId: string): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}`));
    }

    /**
     * Fetch a Share.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId The ID of the Share to link
     *
     * @returns Detailed Share object
     */
    async fetchShare(orgName: string, spaceName: string, shareId: string): Promise<ShareDetails> {
        const res = await this.axios.get<ShareDetails>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}`));
        return res.data;
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
    async searchSharesOfSpace(
        orgName: string,
        spaceName: string,
        search: { sorting?: Sorting; filters?: SearchFilter[] },
        limit: number,
        page: number
    ): Promise<ShareWithUsers[]> {
        const resp = await this.axios.post<ShareWithUsers[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/search`), search, {
            params: {
                limit,
                page,
            },
        });

        return resp.data;
    }

    /**
     * Searches for shares the current user is linked to.
     *
     * @param {{ sorting?: Sorting, filters?: SearchFilter[] }} search - Search criteria including optional sorting and filters.
     * @param {number} limit - Maximum number of results per page.
     * @param {number} page - The page number to retrieve.
     * @returns {Promise<Share[]>} A promise that resolves to a list of shares the current user is linked to.
     */
    async searchSharesOfUser(search: { sorting?: Sorting; filters?: SearchFilter[] }, limit: number, page: number): Promise<Share[]> {
        const resp = await this.axios.post<Share[]>(this.getEndpoint(`/v1/user/shares/search`), search, {
            params: {
                limit,
                page,
            },
        });

        return resp.data;
    }

    /**
     * Unlinks the current user from a specific share in a space.
     *
     * @param {string} orgName - The name of the organization.
     * @param {string} spaceName - The name of the space.
     * @param {string} shareId - The ID of the share to unlink from.
     * @returns {Promise<void>} A promise that resolves when the unlinking is complete.
     */
    async unlinkSelf(orgName: string, spaceName: string, shareId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/link`));
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
    async unlinkOther(orgName: string, spaceName: string, shareId: string, userId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/user/${userId}`));
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
    async linkOther(orgName: string, spaceName: string, shareId: string, emails: string[]): Promise<Share> {
        const res = await this.axios.put<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/user`), { users: emails });

        return res.data;
    }
}
