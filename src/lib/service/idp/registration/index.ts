import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { User } from "../../../interfaces/idp/user";
import { SuccessfulAuth } from "../../../interfaces/idp/user/SuccessfulAuth";

export class IdpRegistration extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Registers a User in the HCloud system. This endpoint will create all the necessary database entries that a User needs to use the HCloud products.
     * It will also send a verification link (with expiration date) to the Users Email address. At this point the User will have an account status of
     * 'AWAITING_VALIDATION' and cannot sign into his account. If the registration will not be validated before the expiration date, the User and all his
     * dependencies will be deleted.
     * @param name - Name of the User
     * @param email - Email of the User
     * @param password - Password
     * @param captcha - Captcha
     */
    register = async (name: string, email: string, password: string, captcha: string, company?: string): Promise<void> => {
        await this.axios.post<void>(this.getEndpoint("/v1/register"), {
            name: name,
            email: email,
            password: password,
            captcha: captcha,
            company,
        });
    };

    /**
     * Validates a previous registration. If successful, the Users account status will be set to 'Active'.
     * @param email - Email of the User
     * @param verificationCode - Email verification code
     * @returns Bearer Token and User object
     */
    validateRegistration = async (email: string, verificationCode: string): Promise<SuccessfulAuth> => {
        const resp = await this.axios.patch<User>(this.getEndpoint("/v1/register/verify"), {
            email: email,
            verificationCode: verificationCode,
        });

        return {
            token: resp.headers["authorization"]?.toString() || "",
            user: resp.data,
        } as SuccessfulAuth;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
