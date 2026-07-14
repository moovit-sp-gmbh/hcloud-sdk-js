import Base, { MaybeRaw } from "../../Base";
import { Version } from "../../interfaces/global";
import { PreLoginResponse } from "../../interfaces/idp";
import { User } from "../../interfaces/idp/user";
import { SuccessfulAuth } from "../../interfaces/idp/user/SuccessfulAuth";
import { IdpGuest } from "./guest";
import { IdpInternal } from "./internal";
import { IdpOAuth } from "./oauth";
import { IdpOrganization } from "./organization";
import { IdpRegistration } from "./registration";
import { IdpUser } from "./user";

export default class Idp extends Base {
    /**
     * Handles everything around organizations
     */
    public get organization(): IdpOrganization {
        if (this._organization === undefined) {
            this._organization = new IdpOrganization(this.options, this.axios);
        }
        return this._organization;
    }
    private _organization?: IdpOrganization;

    /**
     * Handles everything around registration
     */
    public get registration(): IdpRegistration {
        if (this._registration === undefined) {
            this._registration = new IdpRegistration(this.options, this.axios);
        }
        return this._registration;
    }
    private _registration?: IdpRegistration;

    /**
     * Handles everything around open authorization and openId requests
     */
    public get oAuth(): IdpOAuth {
        if (this._oAuth === undefined) {
            this._oAuth = new IdpOAuth(this.options, this.axios);
        }
        return this._oAuth;
    }
    private _oAuth?: IdpOAuth;

    /**
     * Handles everything around a user
     */
    public get user(): IdpUser {
        if (this._user === undefined) {
            this._user = new IdpUser(this.options, this.axios);
        }
        return this._user;
    }
    private _user?: IdpUser;

    /**
     * Handles everything around a guest
     */
    public get guest(): IdpGuest {
        if (this._guest === undefined) {
            this._guest = new IdpGuest(this.options, this.axios);
        }
        return this._guest;
    }
    private _guest?: IdpGuest;

    /**
     * Handles everything around idp's internal endpoints
     */
    public get internal(): IdpInternal {
        if (this._internal === undefined) {
            this._internal = new IdpInternal(this.options, this.axios);
        }
        return this._internal;
    }
    private _internal?: IdpInternal;

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, Version>> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Version>;
    }

    /**
     * Authenticates against the identity provider with a given email and password.
     * @param email Email of the user
     * @param password Password of the user
     * @param token (optional) token if 2FA-TOTP is enabled
     * @returns SuccessfulAuth object holding the token and the user
     */
    async login<R extends boolean = false>(
        email: string,
        password: string,
        token?: string,
        authorizationHeaderToken?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, SuccessfulAuth>> {
        let body = { email: email, password: password };
        if (token) {
            body = { ...body, ...{ token: token } };
        }
        if (authorizationHeaderToken && !authorizationHeaderToken.includes("Bearer ")) {
            authorizationHeaderToken = `Bearer ${authorizationHeaderToken}`;
        }
        const resp = await this.axios.post<User>(this.getEndpoint("/v1/login"), body, {
            headers: authorizationHeaderToken ? { authorization: authorizationHeaderToken } : undefined,
        });

        const authed: SuccessfulAuth = {
            token: resp.headers["authorization"]?.toString() || "",
            user: resp.data,
        };
        return (raw?.raw ? { ...resp, data: authed } : authed) as MaybeRaw<R, SuccessfulAuth>;
    }

    /**
     * Starts the login process via OIDC
     * @param origin The starting URL of the process. After obtaining the credentials, the user will be redirected back to this url.
     * @param oidcProvider The provider to use for the process. Only optional if the user is part of an organization that has a preferred
     * OIDC provider and an associated email that matches the user's. The list of available providers can be found in the public config endpoint.
     * @param hint Valid email address of the user that wants to login. Hint must be defined when provider is not.
     * @returns URL that must be accessed via a browser to continue the login process.
     */
    async loginWithOIDC<R extends boolean = false>(
        origin: string,
        oidcProvider?: string,
        hint?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, string>> {
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
        return (raw?.raw ? resp : location) as MaybeRaw<R, string>;
    }

    /**
     * Starts the login process via SAML 2.0
     * @param origin The starting URL of the process. After obtaining the credentials, the user will be redirected back to this url.
     * @param email  Email of the user. The email domain will be used to determine the appropriate SAML 2.0 provider to use going forward.
     * @returns URL that must be accessed via a browser to continue the login process.
     */
    async loginWithSAML<R extends boolean = false>(origin: string, email: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
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
        return (raw?.raw ? resp : location) as MaybeRaw<R, string>;
    }

    /**
     * Determine if/how the given email can authenticate.
     *
     * @param email  Email of the user
     * @param origin The starting URL of the process. If the authentication process bound to this email is SAML or OIDC,
     *               then the response's location property will include this origin.
     * @returns object that dictates if: the user needs to REGISTER; the user needs to VERIFY_EMAIL; the user can LOGIN using this email;
     *          or the authentication process should continue via an EXTERNAL provider that can be found via the location property.
     */
    async preLogin<R extends boolean = false>(
        email: string,
        origin: string,
        redirect?: "true" | "false",
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PreLoginResponse>> {
        const resp = await this.axios.get<PreLoginResponse>(this.getEndpoint("/v1/login/pre"), {
            params: {
                origin,
                email,
                redirect,
            },
        });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, PreLoginResponse>;
    }

    /**
     * Initiate the password reset process. An email will be sent to the user to move to the next phase.
     *
     * @param email Email of the user
     * @param captcha Valid google reCAPTCHAV2
     * @param targetUrl Optional url the link in the mail will point to
     */
    async resetPassword<R extends boolean = false>(email: string, captcha: string, targetUrl?: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/login/forgot_password"), { email, captcha, targetUrl });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
