import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { OAuthApp, OAuthAppCreate } from "../../../../../interfaces/idp/organization/settings/oauthApp";

export class IdpOAuthApp extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves all OAuth apps of the specified Organization matching the provided search filter(s). Will return all OAuth apps if no search filter is provided.
     * @param orgName Name of the Organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of OAuth apps and the total number of results found in the database (independent of limit and page)
     */
    public searchOauthAppsOfOrganization = async ({
        organizationName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { organizationName: string }): Promise<[OAuthApp[], number]> => {
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

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves an OAuthApp by its ID.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuthApp
     * @returns the requested OAuthApp
     */
    public getOAuthApp = async (orgName: string, oauthAppId: string): Promise<OAuthApp> => {
        const resp = await this.axios.get<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`));

        return resp.data;
    };

    /**
     * Creates a new OAuth app in the specified Organization.
     * @param orgName Name of the Organization
     * @param oAuthAppCreate Object containing the app's name, secretName, callback and optionally a base64 encoded avatar and a description
     * @returns The created OAuth app
     */
    public createOAuthApp = async (orgName: string, oAuthAppCreate: OAuthAppCreate): Promise<OAuthApp> => {
        const resp = await this.axios.post<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth`), oAuthAppCreate);

        return resp.data;
    };

    /**
     * Updates an existing OAuth app.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuth app to be updated
     * @param oAuthAppCreate Object containing the app's name, secretName, callback and optionally a base64 encoded avatar and a description
     * @returns the updated OAuth app
     */
    public updateOAuthApp = async (orgName: string, oauthAppId: string, oAuthAppCreate: OAuthAppCreate): Promise<OAuthApp> => {
        const resp = await this.axios.put<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`), oAuthAppCreate);

        return resp.data;
    };

    /**
     * Deletes an OAuthApp by its ID.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuthApp
     */
    public deleteOAuthApp = async (orgName: string, oauthAppId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`));
    };

    /**
     * Creates a new secret for an existing OAuthApp.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuthApp
     * @param secretName Name of the Secret
     * @returns the updated OAuth app
     */
    public createOAuthAppSecret = async (orgName: string, oauthAppId: string, secretName: string): Promise<OAuthApp> => {
        const resp = await this.axios.post<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}/secret`), {
            secretName,
        });

        return resp.data;
    };

    /**
     * Deletes the specified OAuthApp secret.
     * @param orgName Name of the Organization
     * @param oauthAppId ID of the OAuthApp
     * @param secret Name of the secret that shall be deleted
     * @returns the updated OAuthApp
     */
    public deleteOAuthAppSecret = async (orgName: string, oauthAppId: string, secret: string): Promise<OAuthApp> => {
        const resp = await this.axios.delete<OAuthApp>(
            this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}/secret/${secret}`)
        );

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
