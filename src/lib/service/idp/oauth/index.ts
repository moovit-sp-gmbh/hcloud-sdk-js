import Base from "../../../Base";
import { OAuthToken, OAuthTokenRequest } from "../../../interfaces/idp/oauth";

export class IdpOAuth extends Base {
    /**
     * getAuthorizationCodeInsideRedirectUrl throws for an invalid request (query params do not match OAuthApp).
     * It returns the redirect URL with the code, which is used to redirect to the client application,
     * which can use the code for a back-channel request to get the access token.
     * @param queryString expect the user's / browser's query string, containing the  response_type, client_id,
     * redirect_uri, scopes and optionally state.
     * @returns the entire redirect uri including the authorization code if successful
     */
    async getAuthorizationCodeInsideRedirectUrl(queryString: string, doNotRedirect?: boolean): Promise<string> {
        if (!queryString.startsWith("?")) {
            queryString = `?${queryString}`;
        }
        if (doNotRedirect) {
            queryString += "&no_redirect=true";
        }

        const response = await this.axios.get(this.getEndpoint(`/v1/login/oauth/authorize${queryString}`), { maxRedirects: 0 });

        if (doNotRedirect) {
            return response.data.redirectUrl;
        }
        return response.headers.location;
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
    async getInfoOrAuthorizationCodeInsideRedirectUrl(queryString: string, doNotRedirect?: boolean): Promise<string> {
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
            return response.data.redirectUrl;
        }

        return response.headers.location;
    }

    /**
     * createScopesAndGetAuthorizationCodeInsideRedirectUrl throws for an invalid request (query params do not match OAuthApp).
     * It returns the redirect URL with the code, which is used to redirect to the client application,
     * which can use the code for a back-channel request to get the access token. It also adds the scopes for the user.
     * @param queryString expect the user's / browser's query string, containing the  response_type, client_id,
     * redirect_uri, scopes and optionally state.
     * @returns the entire redirect uri including the authorization code if successful
     */
    async createScopesAndGetAuthorizationCodeInsideRedirectUrl(queryString: string, doNotRedirect?: boolean): Promise<string> {
        if (!queryString.startsWith("?")) {
            queryString = `?${queryString}`;
        }
        if (doNotRedirect) {
            queryString += "&no_redirect=true";
        }

        const response = await this.axios.post(this.getEndpoint(`/v1/login/oauth/authorize${queryString}`));

        if (doNotRedirect) {
            return response.data.redirectUrl;
        }
        return response.data;
    }

    /**
     * A valid code can be used to request a new API token.
     * @param tokenRequest contains the code, client_id, client_secret and redirect_uri
     */
    async exchangeCodeForToken(tokenRequest: OAuthTokenRequest): Promise<OAuthToken> {
        const response = await this.axios.post<OAuthToken>(this.getEndpoint(`/v1/login/oauth/access_token`), tokenRequest);
        return response.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
