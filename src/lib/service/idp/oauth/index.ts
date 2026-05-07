import Base, { MaybeRaw } from "../../../Base";
import { OAuthMetadata, OAuthToken, OAuthTokenRequest } from "../../../interfaces/idp/oauth";
import { OAuthAppPublicInfo } from "../../../interfaces/idp/organization/settings/oauthApp";
import IdpOAuthDevice from "./device";

export class IdpOAuth extends Base {
    public get device(): IdpOAuthDevice {
        if (this._device === undefined) {
            this._device = new IdpOAuthDevice(this.options, this.axios);
        }
        return this._device;
    }
    private _device?: IdpOAuthDevice;

    /**
     * getAuthorizationCodeInsideRedirectUrl throws for an invalid request (query params do not match OAuthApp).
     * It returns the redirect URL with the code, which is used to redirect to the client application,
     * which can use the code for a back-channel request to get the access token.
     * @param queryString expect the user's / browser's query string, containing the  response_type, client_id,
     * redirect_uri, scopes and optionally state.
     * @returns the entire redirect uri including the authorization code if successful
     */
    async getAuthorizationCodeInsideRedirectUrl<R extends boolean = false>(
        queryString: string,
        doNotRedirect?: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, string>> {
        if (!queryString.startsWith("?")) {
            queryString = `?${queryString}`;
        }
        if (doNotRedirect) {
            queryString += "&no_redirect=true";
        }

        const resp = await this.axios.get(this.getEndpoint(`/v1/login/oauth/authorize${queryString}`), { maxRedirects: 0 });

        if (doNotRedirect) {
            return (raw?.raw ? resp : resp.data.redirectUrl) as MaybeRaw<R, string>;
        }
        return (raw?.raw ? resp : resp.headers.location) as MaybeRaw<R, string>;
    }

    /**
     * Check if the user has consented to specified scopes. If the user has already consented this request
     * will return the redirect URL, otherwise, it will be a consent.not.given error.
     *
     * To consent the createScopesAndGetAuthorizationCodeInsideRedirectUrl method should be used.
     * @see IdpOAuth.createScopesAndGetAuthorizationCodeInsideRedirectUrl
     *
     * @param queryString {string} - Query string containing the OAuth parameters: response_type, client_id, scope, state
     * @param doNotRedirect [boolean] - Flag to make the request return a 200 instead of a 3xx status code
     * @returns A string with the redirect URL if the user already consented to the specificied scope. Otherwise, an OAuthApp
     * @see OAuthApp
     */
    async getInfoOrAuthorizationCodeInsideRedirectUrl<R extends boolean = false>(
        queryString: string,
        doNotRedirect?: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, string>> {
        if (!queryString.startsWith("?")) {
            queryString = `?${queryString}`;
        }
        if (doNotRedirect) {
            queryString += "&no_redirect=true";
        }

        const response = await this.axios.get<{ redirectUrl: string }>(this.getEndpoint(`/v1/login/oauth/info${queryString}`), {
            maxRedirects: 0,
        });

        if (response.status < 300) {
            return (raw?.raw ? response : response.data.redirectUrl) as MaybeRaw<R, string>;
        }

        return (raw?.raw ? response : response.headers.location) as MaybeRaw<R, string>;
    }

    /**
     * createScopesAndGetAuthorizationCodeInsideRedirectUrl throws for an invalid request (query params do not match OAuthApp).
     * It returns the redirect URL with the code, which is used to redirect to the client application,
     * which can use the code for a back-channel request to get the access token. It also adds the scopes for the user.
     * @param queryString expect the user's / browser's query string, containing the  response_type, client_id,
     * redirect_uri, scopes and optionally state.
     * @returns the entire redirect uri including the authorization code if successful
     */
    async createScopesAndGetAuthorizationCodeInsideRedirectUrl<R extends boolean = false>(
        queryString: string,
        doNotRedirect?: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, string>> {
        if (!queryString.startsWith("?")) {
            queryString = `?${queryString}`;
        }
        if (doNotRedirect) {
            queryString += "&no_redirect=true";
        }

        const resp = await this.axios.post(this.getEndpoint(`/v1/login/oauth/authorize${queryString}`));

        if (doNotRedirect) {
            return (raw?.raw ? resp : resp.data.redirectUrl) as MaybeRaw<R, string>;
        }
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    /**
     * A valid code can be used to request a new API token.
     * @param tokenRequest contains the code, client_id, client_secret and redirect_uri
     */
    async exchangeCodeForToken<R extends boolean = false>(tokenRequest: OAuthTokenRequest, raw?: { raw: R }): Promise<MaybeRaw<R, OAuthToken>> {
        const response = await this.axios.post<OAuthToken>(this.getEndpoint(`/v1/login/oauth/access_token`), tokenRequest);
        return (raw?.raw ? response : response.data) as MaybeRaw<R, OAuthToken>;
    }

    /**
     * Get OAuth app public information via client ID
     *
     * @param clientId {string} - Client ID of the OAuth app
     * @returns Public OAuth app information
     */
    async getOAuthAppInfo<R extends boolean = false>(clientId: string, raw?: { raw: R }): Promise<MaybeRaw<R, OAuthAppPublicInfo>> {
        const response = await this.axios.get<OAuthAppPublicInfo>(this.getEndpoint(`/v1/login/oauth/app/${clientId}`));

        return (raw?.raw ? response : response.data) as MaybeRaw<R, OAuthAppPublicInfo>;
    }

    /**
     * Retrieves the OAuth 2.0 authorization server metadata
     * This method enables dynamic discovery of endpoint locations and server capabilities as defined in RFC 8414
     * @returns Authorization server metadata
     */
    async getMetadata<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, OAuthMetadata>> {
        const response = await this.axios.get<OAuthMetadata>(this.getEndpoint("/v1/.well-known/oauth-authorization-server"));

        return (raw?.raw ? response : response.data) as MaybeRaw<R, OAuthMetadata>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
