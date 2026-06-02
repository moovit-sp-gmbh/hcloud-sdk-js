import Base, { MaybeRaw } from "../../../Base";
import { EmailCooldown, Share, ShareCreate, SharePatch, ShareWithUsers } from "../../../interfaces/cosmo/share";
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

    /**
     * Resends share emails to **all recipients** associated with a share.
     *
     * This will trigger the backend to re-send the share notification email
     * to every email address that has previously been invited to the share.
     *
     * Returns `undefined` when all emails were sent (204), or an {@link EmailCooldown}
     * object when some recipients were skipped due to cooldown (200).
     *
     * @typeParam R - When `true`, the raw Axios response is returned instead of the parsed result
     *
     * @param orgName   - The organization identifier
     * @param spaceName - The space identifier within the organization
     * @param shareId   - The share ID whose emails should be resent
     * @param raw       - Optional flag to return the raw Axios response
     *
     * @returns `EmailCooldown` when some emails were skipped, `undefined` when all were sent,
     *          or the raw Axios response when `raw.raw` is `true`
     */
    async resendAllEmails<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        shareId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, EmailCooldown | undefined>> {
        const resp = await this.axios.post<EmailCooldown>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/email/all`));

        return (raw?.raw ? resp : resp.status === 200 ? resp.data : undefined) as MaybeRaw<R, EmailCooldown | undefined>;
    }

    /**
     * Resends share emails to **specific recipients** for a share.
     *
     * Only the provided email addresses will receive a new share notification.
     * At least one email address must be provided.
     *
     * Returns `undefined` when all emails were sent (204), or an {@link EmailCooldown}
     * object when some recipients were skipped due to cooldown (200).
     *
     * @typeParam R - When `true`, the raw Axios response is returned instead of the parsed result
     *
     * @param orgName   - The organization identifier
     * @param spaceName - The space identifier within the organization
     * @param shareId   - The share ID whose emails should be resent
     * @param emails    - A non-empty list of email addresses to resend the share to
     * @param raw       - Optional flag to return the raw Axios response
     *
     * @returns `EmailCooldown` when some emails were skipped, `undefined` when all were sent,
     *          or the raw Axios response when `raw.raw` is `true`
     */
    async resendEmails<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        shareId: string,
        emails: [string, ...string[]],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, EmailCooldown | undefined>> {
        const resp = await this.axios.post<EmailCooldown>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/email`), {
            emails,
        });

        return (raw?.raw ? resp : resp.status === 200 ? resp.data : undefined) as MaybeRaw<R, EmailCooldown | undefined>;
    }

    /**
     * Sends a share email to a **specific recipient** after he clicks a public link.
     *
     *
     * @typeParam R - When `true`, the raw Axios response is returned instead of `undefined`
     *
     * @param orgName   - The organization identifier
     * @param spaceName - The space identifier within the organization
     * @param shareId   - The share ID whose emails should be resent
     * @param email     - The email address of the recipient
     * @param shareIdHMAC - The HMAC of the share ID
     * @param raw       - Optional flag to return the raw Axios response
     *
     * @returns `undefined` by default, or the raw Axios response when `raw.raw` is `true`
     */
    async sendShareEmailAfterPublicLinkClick<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        shareId: string,
        email: string,
        shareIdHMAC: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, undefined>> {
        const resp = await this.axios.post(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}/email/publicLink`), {
            email,
            shareIdHMAC,
        });

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, undefined>;
    }
}
