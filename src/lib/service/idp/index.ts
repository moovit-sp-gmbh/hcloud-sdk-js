import Base, { Options } from "../../Base";
import { AxiosInstance } from "axios";
import { User } from "../../interfaces/idp/user";
import { SuccessfulAuth } from "../../interfaces/idp/user/SuccessfulAuth";
import { Version } from "../../interfaces/global";
import { IdpOrganization } from "./organization";
import { IdpUser } from "./user";
import { IdpRegistration } from "./registration";
import { IdpOAuth } from "./oauth";

export default class Idp extends Base {
    /**
     * Handles everything around organizations
     */
    public organization: IdpOrganization;

    /**
     * Handles everything around registration
     */
    public registration: IdpRegistration;

    /**
     * Handles everything around open authorization and openId requests
     */
    public oAuth: IdpOAuth;

    /**
     * Handles everything around a user
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
     * Requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version")).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Authenticates against the identity provider with a given email and password.
     * @param email Email of the user
     * @param password Password of the user
     * @param token (optional) token if 2FA-TOTP is enabled
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
     * Starts the login process via OIDC
     * @param origin The starting URL of the process. After obtaining the credentials, the user will be redirected back to this url.
     * @param oidcProvider The provider to use for the process. Only optional if the user is part of an organization that has a preferred
     * OIDC provider and an associated email that matches the user's. The list of available providers can be found in the public config endpoint.
     * @param hint Valid email address of the user that wants to login. Hint must be defined when provider is not.
     * @returns URL that must be accessed via a browser to continue the login process.
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
     * Starts the login process via SAML 2.0
     * @param origin The starting URL of the process. After obtaining the credentials, the user will be redirected back to this url.
     * @param email  Email of the user. The email domain will be used to determine the appropriate SAML 2.0 provider to use going forward.
     * @returns URL that must be accessed via a browser to continue the login process.
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
