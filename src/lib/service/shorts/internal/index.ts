import Base from "../../../Base";
import { Short } from "../../../interfaces/shorts";

export class ShortsInternal extends Base {
    /**
     * Generates a shortened alias for the provided long URL and sets a maximum number of allowed visits.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param organizationId ID of the organization
     * @param spaceId ID of the space
     * @param url Original long URL that needs to be shortened
     * @param visitsLimit Maximum number of times the shortened link can be accessed
     * @returns the created short url
     */
    async createShort(organizationId: string, spaceId: string, url: string, visitsLimit: number): Promise<Short> {
        const res = await this.axios.post<Short>(this.getEndpoint(`/internal/v1/short`), { url, visitsLimit, organizationId, spaceId });

        return res.data;
    }

    /**
     * Retrieves the full data associated with a shortened URL slug, including the original long URL, the current number of visits, and the maximum allowed visit limit.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param slug Unique identifier or alias representing the shortened version of a URL
     * @returns detailed information about this short url slug
     */
    async getShort(slug: string): Promise<Short> {
        const res = await this.axios.get<Short>(this.getEndpoint(`/internal/v1/short/${slug}`));

        return res.data;
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
    async updateVisitsLimit(slug: string, visitsLimit: number): Promise<Short> {
        const resp = await this.axios.patch<Short>(this.getEndpoint(`/internal/v1/short/${slug}/limit`), { visitsLimit });

        return resp.data;
    }

    /**
     * Deletes the shortened URL associated with the given slug.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param slug Unique identifier representing the shortened version of a URL
     */
    async deleteShort(slug: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/internal/v1/short/${slug}`));
    }

    /**
     * Deletes all shortened URLs associated with the given space ID.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param spaceId ID of the space whose shortened URLs should be deleted
     */
    async deleteSpaceShorts(spaceId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/internal/v1/short/space/${spaceId}`));
    }

    /**
     * Deletes all shortened URLs associated with the given organization ID.
     *
     * This is an internal endpoint and can only be used from backends within the hcloud deployment.
     *
     * @param orgId ID of the organization whose shortened URLs should be deleted
     */
    async deleteOrganizationShorts(orgId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/internal/v1/short/org/${orgId}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
