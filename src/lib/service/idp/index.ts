import Base, { Options } from "../../Base";
import { AxiosInstance } from "axios";
import { User } from "../../interfaces/idp/user";
import { SuccessfulAuth } from "../../interfaces/idp/user/SuccessfulAuth";
import { Version } from "../../interfaces/global";
import { IdpOrganization } from "./organization";
import { IdpUser } from "./user";
import { IdpRegistration } from "./registration";
import { IdpOAuth } from "./oauth";
import { PreLoginResponse } from "../../interfaces/idp";
import { IdpInternal } from "./internal";

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

    /**
     * Handles everything around idp's internal endpoints
     */
    public internal: IdpInternal;
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.organization = new IdpOrganization(this.options, this.axios);
        this.user = new IdpUser(this.options, this.axios);
        this.registration = new IdpRegistration(this.options, this.axios);
        this.oAuth = new IdpOAuth(this.options, this.axios);
        this.internal = new IdpInternal(this.options, this.axios);
    }

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

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
        const resp = await this.axios.post<User>(this.getEndpoint("/v1/login"), body);

        const authed: SuccessfulAuth = {
            token: resp.headers["authorization"]?.toString() || "",
            user: resp.data,
        };
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

    /**
     * Determine if/how the given email can authenticate.
     *
     * @param email  Email of the user
     * @param origin The starting URL of the process. If the authentication process bound to this email is SAML or OIDC,
     *               then the response's location property will include this origin.
     * @returns object that dictates if: the user needs to REGISTER; the user needs to VERIFY_EMAIL; the user can LOGIN using this email;
     *          or the authentication process should continue via an EXTERNAL provider that can be found via the location property.
     */
    preLogin = async (email: string, origin: string): Promise<PreLoginResponse> => {
        const resp = await this.axios.get<PreLoginResponse>(this.getEndpoint("/v1/login/pre"), {
            params: {
                origin,
                email,
            },
        });
        return resp.data;
    };

    /**
     * Initiate the password reset process. An email will be sent to the user to move to the next phase.
     *
     * @param email Email of the user
     * @param captcha Valid google reCAPTCHAV2
     */
    resetPassword = async (email: string, captcha: string): Promise<void> => {
        await this.axios.post<void>(this.getEndpoint("/v1/login/forgot_password"), { email, captcha });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
