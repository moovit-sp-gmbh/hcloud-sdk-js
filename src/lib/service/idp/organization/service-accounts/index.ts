import Base from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, Sorting } from "../../../../interfaces/global";
import { ServiceAccount, ServiceAccountNoToken } from "../../../../interfaces/idp/organization/service-accounts";

export default class IdpOrganizationServiceAccounts extends Base {
    /**
     * Create a service account
     *
     * @param orgName {string} Organization name
     * @param name    {string} Name for the service account
     * @returns {ServiceAccount} Created service account
     */
    async create(orgName: string, name: string): Promise<ServiceAccount> {
        const res = await this.axios.post<ServiceAccount>(this.getEndpoint(`/${orgName}/service-accounts`), { name });
        return res.data;
    }

    /**
     * Delete a service account
     *
     * @param orgName {string} Organization name
     * @param id      {string} Service account ID
     * @returns {void}
     */
    async delete(orgName: string, id: string): Promise<void> {
        await this.axios.delete<ServiceAccountNoToken>(this.getEndpoint(`/${orgName}/service-accounts/${id}`));
    }

    /**
     * Fetch a service account by ID
     *
     * @param orgName {string} Organization name
     * @param id      {string} Service account ID
     * @returns {ServiceAccountNoToken} The service account's token is only visible on creation or token regeneration
     */
    async get(orgName: string, id: string): Promise<ServiceAccountNoToken> {
        const res = await this.axios.get<ServiceAccountNoToken>(this.getEndpoint(`/${orgName}/service-accounts/${id}`));
        return res.data;
    }

    /**
     * Search the service accounts of the organization
     *
     * @param orgName {string}            Organization name
     * @param filters {SearchFilter[]}    Filters to apply
     * @param sorting {Sorting|undefined} Sorting to apply
     * @param limit   {number|undefined}  Page size
     * @param page    {number|undefined}  Page number
     * @returns {PaginatedResponse<ServiceAccountNoToken>} A paginated response containing the service accounts that matched the search parameters
     */
    async search(
        orgName: string,
        filters: SearchFilter[],
        sorting?: Sorting,
        limit?: number,
        page?: number
    ): Promise<PaginatedResponse<ServiceAccountNoToken>> {
        const res = await this.axios.post<ServiceAccountNoToken[]>(
            this.getEndpoint(`/${orgName}/service-accounts/search`),
            {
                filters: filters.map(f => new SearchFilterDTO(f)),
                sorting,
            },
            {
                params: { limit, page },
            }
        );

        return createPaginatedResponse(res);
    }

    /**
     * Regenerate a service account's token
     *
     * @param orgName {string} Organization name
     * @param id      {string} Service account ID
     * @returns {ServiceAccount}
     */
    async regenerateToken(orgName: string, id: string): Promise<ServiceAccountNoToken> {
        const res = await this.axios.patch<ServiceAccount>(this.getEndpoint(`/${orgName}/service-accounts/${id}/regenerate`));
        return res.data;
    }

    /**
     * Rename a service account
     *
     * @param orgName {string} Organization name
     * @param id      {string} Service account ID
     * @param newName {string} Service account's new name
     * @returns {ServiceAccountNoToken}
     */
    async rename(orgName: string, id: string, newName: string): Promise<ServiceAccountNoToken> {
        const res = await this.axios.patch<ServiceAccountNoToken>(this.getEndpoint(`/${orgName}/service-accounts/${id}/name`), {
            name: newName,
        });
        return res.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
