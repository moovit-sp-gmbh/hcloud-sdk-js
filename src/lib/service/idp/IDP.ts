import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { SuccessfulAuth, User } from "../../interfaces/IDP";
import { Version } from "../../interfaces/Global";
import { IdpOrganization } from "./IdpOrganization";
import { IdpUser } from "./IdpUser";
import { IdpRegistration } from "./IdpRegistration";
import {IdpOAuth} from "./IdpOAuth";
import {IdpOAuthApp} from "./IdpOAuthApp";

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
     * oAuthApp handles everything around open authorization applications
     */
    public oAuthApp: IdpOAuthApp;

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
        this.oAuthApp = new IdpOAuthApp(this.options, this.axios);
    }

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Authorize validates a token
     * @param token
     * @returns User object
     */
    authorize = async (): Promise<User> => {
        const resp = await this.axios.get<User>(this.getEndpoint("/v1/authorize"), {}).catch((err: Error) => {
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
    authenticate = async (email: string, password: string, token?: string): Promise<SuccessfulAuth> => {
        let body = { email: email, password: password };
        if (token) {
            body = { ...body, ...{ token: token } };
        }
        const resp = await this.axios.post<User>(this.getEndpoint("/v1/authenticate"), body).catch((err: Error) => {
            throw err;
        });

        const authed: SuccessfulAuth = { token: resp.headers["authorization"]?.toString() || "", user: resp.data };
        return authed;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
