import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../../Base";
import { ActivatedTotp, DeactivatedTotp, UserTotp } from "../../../../../../interfaces/idp/user/Totp";

export class IdpTotp extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Creates a new TOTP for the requesting User.
     * @returns A deactivated TOTP object containing a QR code and the OTPAuth URL
     */
    public createTotp = async (): Promise<DeactivatedTotp> => {
        const resp = await this.axios.post<DeactivatedTotp>(this.getEndpoint(`/v1/user/settings/security/2fa/totp`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Activates a previously created TOTP.
     * @returns Object containing a list of recover codes in case of TOTP authenticator loss
     */
    public activateTotp = async (token: string): Promise<ActivatedTotp> => {
        const resp = await this.axios
            .patch<ActivatedTotp>(this.getEndpoint(`/v1/user/settings/security/2fa/totp/activate`), { token })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Verifies a TOTP.
     * @param userTotp TOTP to verify
     */
    public verifyTotp = async (userTotp: UserTotp): Promise<void> => {
        await this.axios.patch<void>(this.getEndpoint(`/v1/login/verify/totp`), { userTotp }).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * Deactivates (deletes) a previously activated TOTP.
     * @param token TOTP to deactivate
     */
    public deactivateTotp = async (token: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/security/2fa/totp`), { data: { token } }).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * Deactivates (deletes) a previously activated TOTP by using a recovery code.
     * @param email Email of the User
     * @param password Password
     * @param code Recovery code
     */
    public deactivateTotpByRecoverCode = async (email: string, password: string, code: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/recover/totp`), { data: { email, password, code } }).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
