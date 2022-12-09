import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { AuditLog } from "../../interfaces/Auditor";
import { Organization, Pat, PatchUser, PatCreate, PatUpdate, Scopes, SuccessfulAuth, User } from "../../interfaces/IDP";
import { IdpSettings } from "./user/IdpSettings";
export class IdpRegistration extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

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
     * Verify your previous registration against the identity provider
     * @param email
     * @param verificationCode
     * @returns Bearer Token and user
     */
    validateRegistration = async (email: string, verificationCode: string): Promise<SuccessfulAuth> => {
        const resp = await this.axios
            .patch<User>(this.getEndpoint("/v1/registration/verify"), { email: email, verificationCode: verificationCode })
            .catch((err: Error) => {
                throw err;
            });
        return { token: resp.headers["authorization"]?.toString() || "", user: resp.data } as SuccessfulAuth;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
