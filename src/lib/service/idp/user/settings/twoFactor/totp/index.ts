import Base, { MaybeRaw } from "../../../../../../Base";
import { ActivatedTotp, DeactivatedTotp, UserTotp } from "../../../../../../interfaces/idp/user/Totp";

export class IdpTotp extends Base {
    /**
     * Creates a new TOTP for the requesting User.
     * @returns A deactivated TOTP object containing all necessary data to create a QR code
     */
    async createTotp<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, DeactivatedTotp>> {
        const resp = await this.axios.post<DeactivatedTotp>(this.getEndpoint(`/v1/user/settings/security/2fa/totp`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, DeactivatedTotp>;
    }

    /**
     * Activates a previously created TOTP.
     * @returns Object containing a list of recover codes in case of TOTP authenticator loss
     */
    async activateTotp<R extends boolean = false>(token: string, raw?: { raw: R }): Promise<MaybeRaw<R, ActivatedTotp>> {
        const resp = await this.axios.patch<ActivatedTotp>(this.getEndpoint(`/v1/user/settings/security/2fa/totp/activate`), { token });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ActivatedTotp>;
    }

    /**
     * Verifies a TOTP.
     * @param userTotp TOTP to verify
     */
    async verifyTotp<R extends boolean = false>(userTotp: UserTotp, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.patch<void>(this.getEndpoint(`/v1/login/verify/totp`), {
            userTotp,
        });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Deactivates (deletes) a previously activated TOTP.
     * @param token TOTP to deactivate
     */
    async deactivateTotp<R extends boolean = false>(token: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/security/2fa/totp`), { data: { token } });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Deactivates (deletes) a previously activated TOTP by using a recovery code.
     * @param email Email of the User
     * @param password Password
     * @param code Recovery code
     */
    async deactivateTotpByRecoverCode<R extends boolean = false>(
        email: string,
        password: string,
        code: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/user/recover/totp`), {
            data: { email, password, code },
        });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
