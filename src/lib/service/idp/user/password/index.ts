import Base from "../../../../Base";
import { User } from "../../../../interfaces/idp";

export default class UserPasswordService extends Base {
    /**
     * 2nd phase of the reset password flow
     * @param email Email of the user
     * @param oneTimeUseToken Token sent via email
     * @param newPassword New password
     * @param totpToken (Optional) TOTP token in case the user had 2FA enabled
     * @returns User object
     */
    resetPassword = async (email: string, oneTimeUseToken: string, newPassword: string, totpToken?: string) => {
        const res = await this.axios.post<User>(this.getEndpoint("/v1/user/password/reset"), {
            email,
            nonceToken: oneTimeUseToken,
            newPassword,
            totpToken,
        });

        return res.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
