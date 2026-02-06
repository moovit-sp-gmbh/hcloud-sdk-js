import Base, { MaybeRaw } from "../../../Base";
import { Short, ShortType } from "../../../interfaces/shorts";

export class ShortsInternal extends Base {
    /**
     * Generates a shortened alias for the provided long URL and sets a maximum number of allowed visits.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param organizationId ID of the organization
     * @param spaceId ID of the space
     * @param url Original long URL that needs to be shortened
     * @param type Type of the short URL, can be GENERIC or COSMO
     * @param visitsLimit Optional maximum number of times the shortened link can be accessed, after which it will become inactive (max 100 for GENERIC type)
     * @param expireDate Optional expiration date for the shortened URL, represented as a timestamp in milliseconds
     *
     * @returns the created short url
     */
    async createShort<R extends boolean = false>(
        organizationId: string,
        spaceId: string,
        url: string,
        type: ShortType = ShortType.GENERIC,
        visitsLimit?: number,
        expireDate?: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Short>> {
        const res = await this.axios.post<Short>(this.getEndpoint(`/internal/v1/short`), {
            organizationId,
            spaceId,
            url,
            type,
            visitsLimit,
            expireDate,
        });

        return (raw?.raw ? res : res.data) as MaybeRaw<R, Short>;
    }

    /**
     * Retrieves the full data associated with a shortened URL slug, including the original long URL, the current number of visits, and the maximum allowed visit limit.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param slug Unique identifier or alias representing the shortened version of a URL
     * @returns detailed information about this short url slug
     */
    async getShort<R extends boolean = false>(slug: string, raw?: { raw: R }): Promise<MaybeRaw<R, Short>> {
        const res = await this.axios.get<Short>(this.getEndpoint(`/internal/v1/short/${slug}`));

        return (raw?.raw ? res : res.data) as MaybeRaw<R, Short>;
    }

    /**
     * Updates the maximum allowed visit limit for a shortened URL identified by its slug.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param slug Unique identifier representing the shortened version of a URL
     * @param visitsLimit New maximum number of allowed visits for this shortened URL
     * @returns The updated Short object with the new visit limit
     */
    async updateVisitsLimit<R extends boolean = false>(slug: string, visitsLimit: number, raw?: { raw: R }): Promise<MaybeRaw<R, Short>> {
        const resp = await this.axios.patch<Short>(this.getEndpoint(`/internal/v1/short/${slug}/limit`), { visitsLimit });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Short>;
    }

    /**
     * Deletes the shortened URL associated with the given slug.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param slug Unique identifier representing the shortened version of a URL
     */
    async deleteShort<R extends boolean = false>(slug: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/internal/v1/short/${slug}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Deletes all shortened URLs associated with the given space ID.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param spaceId ID of the space whose shortened URLs should be deleted
     */
    async deleteSpaceShorts<R extends boolean = false>(spaceId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/internal/v1/short/space/${spaceId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Deletes all shortened URLs associated with the given organization ID.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param orgId ID of the organization whose shortened URLs should be deleted
     */
    async deleteOrganizationShorts<R extends boolean = false>(orgId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/internal/v1/short/org/${orgId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
