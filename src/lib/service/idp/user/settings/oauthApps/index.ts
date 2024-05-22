import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { OAuthApp } from "../../../../../interfaces/idp/organization/settings/oauthApp";

export class IdpOAuthApps extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves all OAuth apps of the requesting User that match the provided search filter(s). Returns all OAuth apps if no search filter is provided.
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of OAuth apps and the total number of results found in the database (independent of limit and page)
     */
    public searchOAuthApps = async ({ filters, sorting, limit = 25, page = 0 }: SearchParams): Promise<PaginatedResponse<OAuthApp>> => {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });
        const resp = await this.axios.post<OAuthApp[]>(this.getEndpoint(`/v1/user/settings/oauth/search?limit=${limit}&page=${page}`), {
            filters: filtersDTO,
            sorting: sorting,
        });

        return createPaginatedResponse(resp) as PaginatedResponse<OAuthApp>;
    };

    /**
     * Revokes user access from the provided OAuth app.
     * @param oAuthAppId ID of the OAuth app
     */
    public revokeOAuthAppAccess = async (oAuthAppId: string): Promise<void> => {
        await this.axios.delete(this.getEndpoint(`/v1/user/settings/oauth/${oAuthAppId}/revoke`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
