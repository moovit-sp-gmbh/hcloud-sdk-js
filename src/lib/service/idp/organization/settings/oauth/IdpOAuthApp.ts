import { AxiosInstance } from "axios";
import base, { Options } from "../../../../../base";
import { OAuthApp, OAuthAppCreation, Scopes } from "../../../../../interfaces/IDP";

export class IdpOAuthApp extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * listOauthAppsOfOrganization requests all OAuth apps for the user's active organization
     * @param orgName the organization name
     * @param limit an optional response limit limit (1-100; defaults to 25)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns OAuthApp array and the total number of OAuth apps
     */
    public listOauthAppsOfOrganization = async (orgName: string, limit?: number, page?: number): Promise<[OAuthApp[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios
            .get<OAuthApp[]>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth?limit=${limit}&page=${page}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getOAuthAppById requests an OAuthApp by its id
     * @param orgName the organization name
     * @param oauthAppId the id of an OAuthApp
     * @returns OAuthApp object
     */
    public getOAuthAppById = async (orgName: string, oauthAppId: string): Promise<OAuthApp> => {
        const resp = await this.axios
            .get<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createApplication will create a new OAuth app for the user's active organization
     * @param orgName the organization name
     * @param oAuthAppCreation a DTO containing the app's name, secretName, callback and optionally  a base64 encoded avatar
     * and a description
     * @returns OAuthApp
     */
    public createOAuthApp = async (orgName: string, oAuthAppCreation: OAuthAppCreation): Promise<OAuthApp> => {
        const resp = await this.axios
            .post<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth`), oAuthAppCreation)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * updateOAuthApp will update an existing OAuth app
     * @param orgName the organization name
     * @param oauthAppId of the OAuthApp to be updated
     * @param oAuthAppCreation a DTO containing the app's name, secretName, callback and optionally  a base64 encoded avatar
     * and a description
     * @returns OAuthApp
     */
    public updateOAuthApp = async (orgName: string, oauthAppId: string, oAuthAppCreation: OAuthAppCreation): Promise<OAuthApp> => {
        const resp = await this.axios
            .put<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`), oAuthAppCreation)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteOAuthAppById deletes an OAuthApp by its id
     * @param orgName the organization name
     * @param oauthAppId the id of an OAuthApp
     * @returns 204 no content
     */
    public deleteOAuthAppById = async (orgName: string, oauthAppId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * createOAuthAppSecret will create a new secret inside an existing OAuthApp
     * @param orgName the organization name
     * @param oauthAppId of the OAuthApp that the new secret will be added to
     * @param secretName
     * @returns OAuthApp
     */
    public createOAuthAppSecret = async (orgName: string, oauthAppId: string, secretName: string): Promise<OAuthApp> => {
        const resp = await this.axios
            .post<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}/secret`), { secretName })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * patchOAuthAppSecretName will update the name of an existing OAuthApp secret
     * @param orgName the organization name
     * @param oauthAppId of the OAuthApp that the new secret will be added to
     * @param uuid of the secret that will be updated
     * @param secretName
     * @returns OAuthApp
     */
    public patchOAuthAppSecretName = async (orgName: string, oauthAppId: string, secret: string, secretName: string): Promise<OAuthApp> => {
        const resp = await this.axios
            .patch<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}/secret/${secret}`), {
                secretName,
            })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteOAuthAppSecret will delete the specified OAuthApp secret
     * @param orgName the organization name
     * @param oauthAppId of the OAuthApp that the new secret will be added to
     * @param uuid of the secret that will be updated
     * @returns OAuthApp
     */
    public deleteOAuthAppSecret = async (orgName: string, oauthAppId: string, secret: string): Promise<OAuthApp> => {
        const resp = await this.axios
            .delete<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oauthAppId}/secret/${secret}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
