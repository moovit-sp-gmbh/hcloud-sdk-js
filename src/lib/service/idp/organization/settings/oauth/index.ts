import Base, { MaybeRaw } from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { OAuthApp, OAuthAppCreate } from "../../../../../interfaces/idp/organization/settings/oauthApp";

export class IdpOAuthApp extends Base {
    /**
     * Retrieves all OAuth apps of the specified Organization matching the provided search filter(s). Will return all OAuth apps if no search filter is provided.
     * @param orgName Name of the Organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of OAuth apps and the total number of results found in the database (independent of limit and page)
     */
    async searchOauthAppsOfOrganization<R extends boolean = false>(
        { organizationName, filters, sorting, limit = 25, page = 0 }: SearchParams & { organizationName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<OAuthApp>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<OAuthApp[]>(
            this.getEndpoint(`/v1/org/${organizationName}/settings/applications/oauth/search?limit=${limit}&page=${page}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<OAuthApp>
        >;
    }

    /**
     * Retrieves an OAuthApp by its ID.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuthApp
     * @returns the requested OAuthApp
     */
    async getOAuthApp<R extends boolean = false>(orgName: string, oauthAppId: string, raw?: { raw: R }): Promise<MaybeRaw<R, OAuthApp>> {
        const resp = await this.axios.get<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OAuthApp>;
    }

    /**
     * Creates a new OAuth app in the specified Organization.
     * @param orgName Name of the Organization
     * @param oAuthAppCreate Object containing the app's name, secretName, callback and optionally a base64 encoded avatar and a description
     * @returns The created OAuth app
     */
    async createOAuthApp<R extends boolean = false>(
        orgName: string,
        oAuthAppCreate: OAuthAppCreate,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OAuthApp>> {
        const resp = await this.axios.post<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth`), oAuthAppCreate);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OAuthApp>;
    }

    /**
     * Updates an existing OAuth app.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuth app to be updated
     * @param oAuthAppCreate Object containing the app's name, secretName, callback and optionally a base64 encoded avatar and a description
     * @returns the updated OAuth app
     */
    async updateOAuthApp<R extends boolean = false>(
        orgName: string,
        oauthAppId: string,
        oAuthAppCreate: OAuthAppCreate,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OAuthApp>> {
        const resp = await this.axios.put<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`), oAuthAppCreate);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OAuthApp>;
    }

    /**
     * Deletes an OAuthApp by its ID.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuthApp
     */
    async deleteOAuthApp<R extends boolean = false>(orgName: string, oauthAppId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Creates a new secret for an existing OAuthApp.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuthApp
     * @param secretName Name of the Secret
     * @returns the updated OAuth app
     */
    async createOAuthAppSecret<R extends boolean = false>(
        orgName: string,
        oauthAppId: string,
        secretName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OAuthApp>> {
        const resp = await this.axios.post<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}/secret`), {
            secretName,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OAuthApp>;
    }

    /**
     * Deletes the specified OAuthApp secret.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuthApp
     * @param secret Name of the secret that shall be deleted
     * @returns the updated OAuthApp
     */
    async deleteOAuthAppSecret<R extends boolean = false>(
        orgName: string,
        oauthAppId: string,
        secret: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OAuthApp>> {
        const resp = await this.axios.delete<OAuthApp>(
            this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}/secret/${secret}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OAuthApp>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
