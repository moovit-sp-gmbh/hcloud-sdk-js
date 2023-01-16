import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import OAuthApp, { Scopes } from "../../interfaces/IDP";
import OAuthAppCreation from "../../interfaces/IDP";

export class IdpOAuthApp extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * listOAuthAppsOfOrganization requests all OAuth apps for the user's active organization
     * @param limit an optional response limit (1-1000; defaults to 500)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns OAuthApp array and the total number of OAuth apps
     */
    public listOAuthAppsOfOrganization = async (limit?: number, page?: number): Promise<[OAuthApp[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<OAuthApp[]>(this.getEndpoint(`/v1/organization/oauth/list?limit=${limit}&page=${page}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getOAuthAppById requests an OAuthApp by its id
     * @param id the id of an OAuthApp
     * @returns OAuthApp object
     */
    public getOAuthAppById = async (id: string): Promise<OAuthApp> => {
        const resp = await this.axios.get<OAuthApp>(this.getEndpoint(`/v1/organization/oauth/${id}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createOAuthApp will create a new OAuth app for the user's active organization
     * @param oAuthAppCreation a DTO containing the app's name, secretName, callback and optionally  a base64 encoded avatar
     * and a description
     * @returns OAuthApp
     */
    public createOAuthApp = async (oAuthAppCreation: OAuthAppCreation): Promise<OAuthApp> => {
        const resp = await this.axios.post<OAuthApp>(this.getEndpoint(`/v1/organization/oauth`), oAuthAppCreation).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * updateOAuthApp will update an existing OAuth app
     * @param id of the OAuthApp to be updated
     * @param oAuthAppCreation a DTO containing the app's name, secretName, callback and optionally  a base64 encoded avatar
     * and a description
     * @returns OAuthApp
     */
    public updateOAuthApp = async (id: string, oAuthAppCreation: OAuthAppCreation): Promise<OAuthApp> => {
        const resp = await this.axios.put<OAuthApp>(this.getEndpoint(`/v1/organization/oauth/${id}`), oAuthAppCreation).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteOAuthAppById deletes an OAuthApp by its id
     * @param id the id of an OAuthApp
     */
    public deleteOAuthAppById = async (id: string): Promise<void> => {
        await this.axios.delete<OAuthApp>(this.getEndpoint(`/v1/organization/oauth/${id}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * createOAuthAppSecret will create a new secret inside an existing OAuthApp
     * @param id of the OAuthApp that the new secret will be added to
     * @param secretName
     * @returns OAuthApp
     */
    public createOAuthAppSecret = async (id: string, secretName: string): Promise<OAuthApp> => {
        const resp = await this.axios.post<OAuthApp>(this.getEndpoint(`/v1/organization/oauth/${id}`), { secretName }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * patchOAuthAppSecretName will update the name of an existing OAuthApp secret
     * @param id of the OAuthApp that the new secret will be added to
     * @param uuid of the secret that will be updated
     * @param secretName
     * @returns OAuthApp
     */
    public patchOAuthAppSecretName = async (id: string, uuid: string, secretName: string): Promise<OAuthApp> => {
        const resp = await this.axios
            .patch<OAuthApp>(this.getEndpoint(`/v1/organization/oauth/${id}/${uuid}`), { secretName })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteOAuthAppSecret will delete the specified OAuthApp secret
     * @param id of the OAuthApp that the new secret will be added to
     * @param uuid of the secret that will be updated
     * @returns OAuthApp
     */
    public deleteOAuthAppSecret = async (id: string, uuid: string): Promise<OAuthApp> => {
        const resp = await this.axios.delete<OAuthApp>(this.getEndpoint(`/v1/organization/oauth/${id}/${uuid}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteOAuthAppPat will delete the PAT (personal access token) of the OAuthApp
     * @param id of the OAuthApp that the new secret will be added to
     * @returns OAuthApp
     */
    public deleteOAuthAppPat = async (id: string): Promise<OAuthApp> => {
        const resp = await this.axios.delete<OAuthApp>(this.getEndpoint(`/v1/organization/oauth/${id}/pat`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
