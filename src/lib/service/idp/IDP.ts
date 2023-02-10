import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { SuccessfulAuth, User } from "../../interfaces/IDP";
import { Version } from "../../interfaces/Global";
import { IdpOrganization } from "./organization/IdpOrganization";
import { IdpUser } from "./user/IdpUser";
import { IdpRegistration } from "./IdpRegistration";

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
     * user handles everything around a user
     */
    public user: IdpUser;
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.organization = new IdpOrganization(this.options, this.axios);
        this.user = new IdpUser(this.options, this.axios);
        this.registration = new IdpRegistration(this.options, this.axios);
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

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
