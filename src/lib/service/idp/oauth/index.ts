import { AxiosInstance } from "axios"
import Base, { Options } from "../../../Base"
import { OAuthToken, OAuthTokenRequest } from "../../../interfaces/idp/oauth"

export class IdpOAuth extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * getAuthorizationCodeInsideRedirectUrl throws for an invalid request (query params do not match OAuthApp).
     * It returns the redirect URL with the code, which is used to redirect to the client application,
     * which can use the code for a back-channel request to get the access token.
     * @param queryString expect the user's / browser's query string, containing the  response_type, client_id,
     * redirect_uri, scopes and optionally state.
     * @returns the entire redirect uri including the authorization code if successful
     */
    public getAuthorizationCodeInsideRedirectUrl = async (queryString: string): Promise<string> => {
        if (!queryString.startsWith("?")) {
            queryString = `?${queryString}`;
        }
        const response = await this.axios.get(this.getEndpoint(`/v1/login/oauth/authorize${queryString}`), { maxRedirects: 0 });
        return response.headers.location;
    };

    /**
     * createScopesAndGetAuthorizationCodeInsideRedirectUrl throws for an invalid request (query params do not match OAuthApp).
     * It returns the redirect URL with the code, which is used to redirect to the client application,
     * which can use the code for a back-channel request to get the access token. It also adds the scopes for the user.
     * @param queryString expect the user's / browser's query string, containing the  response_type, client_id,
     * redirect_uri, scopes and optionally state.
     * @returns the entire redirect uri including the authorization code if successful
     */
    public createScopesAndGetAuthorizationCodeInsideRedirectUrl = async (queryString: string): Promise<string> => {
        if (!queryString.startsWith("?")) {
            queryString = `?${queryString}`;
        }
        const response = await this.axios.post(this.getEndpoint(`/v1/login/oauth/authorize${queryString}`), {
            maxRedirects: 0,
        });
        return response.headers.location;
    };

    /**
     * A valid code can be used to request a new API token.
     * @param tokenRequest contains the code, client_id, client_secret and redirect_uri
     */
    public exchangeCodeForToken = async (tokenRequest: OAuthTokenRequest): Promise<OAuthToken> => {
        const response = await this.axios.post<OAuthToken>(this.getEndpoint(`/v1/login/oauth/access_token`), tokenRequest);
        return response.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
