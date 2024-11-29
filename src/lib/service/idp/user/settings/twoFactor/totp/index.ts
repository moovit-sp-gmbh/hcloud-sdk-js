import Base from "../../../../../../Base";
import { ActivatedTotp, DeactivatedTotp, UserTotp } from "../../../../../../interfaces/idp/user/Totp";

export class IdpTotp extends Base {
    /**
     * Creates a new TOTP for the requesting User.
     * @returns A deactivated TOTP object containing all necessary data to create a QR code
     */
    async createTotp(): Promise<DeactivatedTotp> {
        const resp = await this.axios.post<DeactivatedTotp>(this.getEndpoint(`/v1/user/settings/security/2fa/totp`));

        return resp.data;
    }

    /**
     * Activates a previously created TOTP.
     * @returns Object containing a list of recover codes in case of TOTP authenticator loss
     */
    async activateTotp(token: string): Promise<ActivatedTotp> {
        const resp = await this.axios.patch<ActivatedTotp>(this.getEndpoint(`/v1/user/settings/security/2fa/totp/activate`), { token });

        return resp.data;
    }

    /**
     * Verifies a TOTP.
     * @param userTotp TOTP to verify
     */
    async verifyTotp(userTotp: UserTotp): Promise<void> {
        await this.axios.patch<void>(this.getEndpoint(`/v1/login/verify/totp`), {
            userTotp,
        });
    }

    /**
     * Deactivates (deletes) a previously activated TOTP.
     * @param token TOTP to deactivate
     */
    async deactivateTotp(token: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/security/2fa/totp`), { data: { token } });
    }

    /**
     * Deactivates (deletes) a previously activated TOTP by using a recovery code.
     * @param email Email of the User
     * @param password Password
     * @param code Recovery code
     */
    async deactivateTotpByRecoverCode(email: string, password: string, code: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/recover/totp`), {
            data: { email, password, code },
        });
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
