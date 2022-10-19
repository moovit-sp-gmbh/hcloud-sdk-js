import base, { Options } from "../../base";
import { Axios } from "axios";
import { SuccessfulAuth, User } from "../../interfaces/IDP";
import { Version } from "../../interfaces/Global";
import { IdpOrganization } from "./IdpOrganization";
import { IdpUser } from "./IdpUser";

export default class IDP extends base {
    /**
     * organization handles everything around organizations
     */
    public organization: IdpOrganization;
    /**
     * user handles everything around a user
     */
    public user: IdpUser;
    constructor(opts: Options, axios: Axios) {
        super(opts, axios);
        this.organization = new IdpOrganization(opts, axios);
        this.user = new IdpUser(opts, axios);
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
     * Register against the identity provider
     * @param name
     * @param email
     * @param password
     * @returns Bearer Token
     */
    register = async (name: string, email: string, password: string): Promise<User> => {
        const resp = await this.axios
            .post<User>(this.getEndpoint("/v1/registration"), { name: name, email: email, password: password })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Authenticate against the identity provider with a given email and password.
     * @param email
     * @param password
     * @returns SuccessfulAuth object holding the token and the user
     */
    authenticate = async (email: string, password: string): Promise<SuccessfulAuth> => {
        const resp = await this.axios.post<User>(this.getEndpoint("/v1/authenticate"), { email: email, password: password }).catch((err: Error) => {
            throw err;
        });

        const authed: SuccessfulAuth = { token: resp.headers.authorization, user: resp.data };
        return authed;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/account${endpoint}`;
    }
}
