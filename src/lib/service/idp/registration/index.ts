import Base, { MaybeRaw } from "../../../Base";
import { User } from "../../../interfaces/idp/user";
import { SuccessfulAuth } from "../../../interfaces/idp/user/SuccessfulAuth";

export class IdpRegistration extends Base {
    /**
     * Registers a User in the HCloud system. This endpoint will send a verification link (with expiration date) to the Users' email address.
     * At this point the User will have an account status of 'AWAITING_VALIDATION' and cannot sign into his account. If the registration won't be
     * validated before the expiration date, the user will be deleted again.
     * @param name - Name of the User
     * @param email - Email of the User
     * @param password - Password
     * @param captcha - Captcha
     * @param company - Optional company name
     * @param regionId - Optional region id
     * @param targetUrl Optional url the link in the mail will point to
     */
    async register<R extends boolean = false>(
        name: string,
        email: string,
        password: string,
        captcha: string,
        company?: string,
        regionId?: string,
        targetUrl?: string,
        validationCode?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post<void>(
            this.getEndpoint("/v1/register"),
            {
                name: name,
                email: email,
                password: password,
                captcha: captcha,
                company,
                regionId,
                targetUrl,
            },
            { params: { validationCode } }
        );

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Triggers the registration mail to be resend if the first one got lost
     * @param name - Name of the User
     * @param email - Email of the User
     * @param password - Password
     * @param captcha - Captcha
     * @param company - Optional company name
     * @param regionId - Optional region id
     * @param targetUrl Optional url the link in the mail will point to
     */
    async resendRegistrationMail<R extends boolean = false>(
        name: string,
        email: string,
        password: string,
        captcha: string,
        company?: string,
        regionId?: string,
        targetUrl?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.patch<void>(this.getEndpoint("/v1/register/resendRegistrationEmail"), {
            name: name,
            email: email,
            password: password,
            captcha: captcha,
            company,
            regionId,
            targetUrl,
        });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Validates a previous registration. If successful, the Users account status will be set to 'Active'.
     * @param email - Email of the User
     * @param verificationCode - Email verification code
     * @param regionId - Optional region id
     * @returns Bearer Token and User object
     */
    async validateRegistration<R extends boolean = false>(
        email: string,
        verificationCode: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, SuccessfulAuth>> {
        const resp = await this.axios.patch<User>(this.getEndpoint("/v1/register/verify"), {
            email,
            verificationCode,
        });

        return (
            raw?.raw
                ? {
                      ...resp,
                      data: {
                          token: resp.headers["authorization"]?.toString() || "",
                          user: resp.data,
                      },
                  }
                : {
                      token: resp.headers["authorization"]?.toString() || "",
                      user: resp.data,
                  }
        ) as MaybeRaw<R, SuccessfulAuth>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
