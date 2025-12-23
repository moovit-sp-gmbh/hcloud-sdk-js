import Base, { MaybeRaw } from "../../../../Base";
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
    async create<R extends boolean = false>(orgName: string, name: string, raw?: { raw: R }): Promise<MaybeRaw<R, ServiceAccount>> {
        const res = await this.axios.post<ServiceAccount>(this.getEndpoint(`/${orgName}/service-accounts`), { name });
        return (raw?.raw ? res : res.data) as MaybeRaw<R, ServiceAccount>;
    }

    /**
     * Delete a service account
     *
     * @param orgName {string} Organization name
     * @param id      {string} Service account ID
     * @returns {ServiceAccountNoToken}
     */
    async delete<R extends boolean = false>(orgName: string, id: string, raw?: { raw: R }): Promise<MaybeRaw<R, ServiceAccountNoToken>> {
        const repo = await this.axios.delete<ServiceAccountNoToken>(this.getEndpoint(`/${orgName}/service-accounts/${id}`));
        return (raw?.raw ? repo : repo.data) as MaybeRaw<R, ServiceAccountNoToken>;
    }

    /**
     * Fetch a service account by ID
     *
     * @param orgName {string} Organization name
     * @param id      {string} Service account ID
     * @returns {ServiceAccountNoToken} The service account's token is only visible on creation or token regeneration
     */
    async get<R extends boolean = false>(orgName: string, id: string, raw?: { raw: R }): Promise<MaybeRaw<R, ServiceAccountNoToken>> {
        const res = await this.axios.get<ServiceAccountNoToken>(this.getEndpoint(`/${orgName}/service-accounts/${id}`));
        return (raw?.raw ? res : res.data) as MaybeRaw<R, ServiceAccountNoToken>;
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
    async search<R extends boolean = false>(
        params: {
            orgName: string;
            filters: SearchFilter[];
            sorting?: Sorting;
            limit?: number;
            page?: number;
        },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<ServiceAccountNoToken>>> {
        const limit = params.limit || 25;
        const page = params.page || 0;
        const res = await this.axios.post<ServiceAccountNoToken[]>(
            this.getEndpoint(`/${params.orgName}/service-accounts/search?limit=${limit}&page=${page}`),
            {
                filters: params.filters.map(f => new SearchFilterDTO(f)),
                sorting: params.sorting,
            }
        );

        return (raw?.raw ? { ...res, data: createPaginatedResponse(res) } : createPaginatedResponse(res)) as MaybeRaw<
            R,
            PaginatedResponse<ServiceAccountNoToken>
        >;
    }

    /**
     * Regenerate a service account's token
     *
     * @param orgName {string} Organization name
     * @param id      {string} Service account ID
     * @returns {ServiceAccount}
     */
    async regenerateToken<R extends boolean = false>(orgName: string, id: string, raw?: { raw: R }): Promise<MaybeRaw<R, ServiceAccount>> {
        const res = await this.axios.patch<ServiceAccount>(this.getEndpoint(`/${orgName}/service-accounts/${id}/regenerate`));
        return (raw?.raw ? res : res.data) as MaybeRaw<R, ServiceAccount>;
    }

    /**
     * Rename a service account
     *
     * @param orgName {string} Organization name
     * @param id      {string} Service account ID
     * @param newName {string} Service account's new name
     * @returns {ServiceAccountNoToken}
     */
    async rename<R extends boolean = false>(
        orgName: string,
        id: string,
        newName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ServiceAccountNoToken>> {
        const res = await this.axios.patch<ServiceAccountNoToken>(this.getEndpoint(`/${orgName}/service-accounts/${id}/name`), {
            name: newName,
        });
        return (raw?.raw ? res : res.data) as MaybeRaw<R, ServiceAccountNoToken>;
    }

    /**
     * Updates the avatar of the specified service account
     * @param orgName Name of the organization
     * @param id      {string} Service account ID
     * @param file Image as Javascript File
     * @returns Service account details with updated avatar
     */
    async updateAvatar<R extends boolean = false>(orgName: string, id: string, file: File, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<void>(this.getEndpoint(`/${orgName}/service-accounts/${id}/avatar`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
