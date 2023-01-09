import { AxiosInstance } from "axios";
import base, { Options } from "../../../../../base";
import { ActivatedTotp, DeactivatedTotp } from "../../../../../interfaces/IDP";

export class IdpTotp extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * createTotp creates a new TOTP code
     * @returns a qrcode and the according orpAuthUrl
     */
    public createTotp = async (): Promise<DeactivatedTotp> => {
        const resp = await this.axios.post<DeactivatedTotp>(this.getEndpoint(`/v1/user/2fa/totp`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * activateTotp activate a previously created TOTP
     * @returns a list of recover codes in case of TOTP authenticator loss
     */
    public activateTotp = async (token: string): Promise<ActivatedTotp> => {
        const resp = await this.axios.patch<ActivatedTotp>(this.getEndpoint(`/v1/user/2fa/totp/activate`), { token }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deactivateTotp deactivate (delete) a previously activated TOTP
     * @returns an empty body
     */
    public deactivateTotp = async (token: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/2fa/totp`), { data: { token } }).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * deactivateTotpByRecoverCode deactivate (delete) a previously activated TOTP by using a recover code
     * @returns an empty body
     */
    public deactivateTotpByRecoverCode = async (email: string, password: string, code: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/2fa/totp/recover`), { data: { email, password, code } }).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}