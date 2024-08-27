import Base from "../../../../Base";
import { User } from "../../../../interfaces/idp";

export default class UserPasswordService extends Base {
    /**
     * 2nd phase of the reset password flow
     * @param email Email of the user
     * @param nonce Nonce present in the link sent via email
     * @param newPassword New password
     * @param totpToken (Optional) TOTP token in case the user had 2FA enabled
     * @returns User object
     */
    resetPassword = async (email: string, nonce: string, newPassword: string, totpToken?: string) => {
        const res = await this.axios.post<User>(this.getEndpoint("/v1/user/password/reset"), {
            email,
            nonce,
            newPassword,
            totpToken,
        });

        return res.data;
    };

    parseResetPasswordToken(token: string): { email: string; nonce: string; regionId?: string } {
        const decoded = atob(token.replace("_", "/").replace("-", "+"));

        let obj;
        try {
            obj = JSON.parse(decoded);
        } catch (err) {
            throw new Error(`Token ${token} is poorly formatted. Decoded to ${decoded}.`);
        }

        if (!("email" in obj) || !("nonce" in obj)) {
            throw new Error(`Decoded token ${decoded} is missing email or nonce property.`);
        }

        return obj;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
