import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { SuccessfulAuth, User } from "../../interfaces/IDP";
import { Version } from "../../interfaces/Global";
import { IdpOrganization } from "./organization/IdpOrganization";
import { IdpUser } from "./user/IdpUser";
import { IdpRegistration } from "./IdpRegistration";
import { IdpOAuth } from "./IdpOAuth";
import { IdpOAuthApp } from "./organization/settings/oauth/IdpOAuthApp";

export default class IDP extends base {
    /**
     * organization handles everything around organizations
     */
    public organization: IdpOrganization;

    /**
     * registration handles everything around registration
     */
    public registration: IdpRegistration;

    /**
     * oAuth handles everything around open authorization and openId requests
     */
    public oAuth: IdpOAuth;

    /**
     * user handles everything around a user
     */
    public user: IdpUser;
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.organization = new IdpOrganization(this.options, this.axios);
        this.user = new IdpUser(this.options, this.axios);
        this.registration = new IdpRegistration(this.options, this.axios);
        this.oAuth = new IdpOAuth(this.options, this.axios);
    }

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version")).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Authenticate against the identity provider with a given email and password.
     * @param email
     * @param password
     * @param token Optional token if 2FA-TOTP is enabled
     * @returns SuccessfulAuth object holding the token and the user
     */
    login = async (email: string, password: string, token?: string): Promise<SuccessfulAuth> => {
        let body = { email: email, password: password };
        if (token) {
            body = { ...body, ...{ token: token } };
        }
        const resp = await this.axios.post<User>(this.getEndpoint("/v1/login"), body).catch((err: Error) => {
            throw err;
        });

        const authed: SuccessfulAuth = { token: resp.headers["authorization"]?.toString() || "", user: resp.data };
        return authed;
    };

    /**
     * Start the login process via OIDC
     * @param origin         The starting URL of the process. After obtaining the credentials, the user will be redirected back to this url.
     * @param [oidcProvider] The provider to use for the process. Only optional if the user is part of an organization
     *                       that has a preferred OIDC provider and an associated email that matches the user's.
     *                       The list of available providers can be found in the public config endpoint.
     * @param [hint]         A valid email address of the user that wants to login. Hint must be defined when provider is not.
     * @returns string the URL that must be accessed via a browser to continue the login process.
     */
    loginWithOIDC = async (origin: string, oidcProvider?: string, hint?: string): Promise<string> => {
        const resp = await this.axios.get(this.getEndpoint("/v1/login/oidc"), {
            params: {
                origin,
                provider: oidcProvider,
                hint,
            },
            maxRedirects: 0,
            validateStatus: status => {
                return status >= 300 && status < 400;
            },
        });
        const location = resp.headers.location;
        if (!location) {
            throw new Error("Location header is undefined.");
        }
        return location;
    };

    /**
     * Start the login process via SAML 2.0
     * @param origin The starting URL of the process. After obtaining the credentials, the user will be redirected back to this url.
     * @param email  The user's email. The email domain will be used to determine the appropriate SAML 2.0 provider to use going forward.
     * @returns string the URL that must be accessed via a browser to continue the login process.
     */
    loginWithSAML = async (origin: string, email: string): Promise<string> => {
        const resp = await this.axios.get(this.getEndpoint("/v1/login/saml"), {
            params: {
                origin,
                email,
            },
            maxRedirects: 0,
            validateStatus: status => {
                return status >= 300 && status < 400;
            },
        });
        const location = resp.headers.location;
        if (!location) {
            throw new Error("Location header is undefined.");
        }
        return location;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
