import Base, { MaybeRaw } from "../../../Base";
import { SuccessfulAuth, User } from "../../../interfaces/idp";

export class IdpGuest extends Base {
    /**
     * Creates a new guest user account.
     *
     * @param email - The email address of the guest to create.
     * @param name - The display name of the guest user.
     * @param emailHMAC - An HMAC signature of the email, used for validation.
     * @returns A promise resolving to a `SuccessfulAuth` object containing:
     *   - `user`: The created `User` object.
     *   - `token`: An authorization token returned by the API.
     */
    async createGuest<R extends boolean = false>(
        email: string,
        name: string,
        emailHMAC: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, SuccessfulAuth>> {
        const resp = await this.axios.post<User>(this.getEndpoint("/v1/guest"), { email, name, hmac: emailHMAC });

        return (
            raw?.raw
                ? { ...resp, data: { user: resp.data, token: resp.headers.authorization } }
                : { user: resp.data, token: resp.headers.authorization }
        ) as MaybeRaw<R, SuccessfulAuth>;
    }

    /**
     * Logs in as an existing guest user.
     *
     * @param email - The email address of the guest to log in.
     * @param emailHMAC - An HMAC signature of the email, used for validation.
     * @returns A promise resolving to a `SuccessfulAuth` object containing:
     *   - `user`: The authenticated `User` object.
     *   - `token`: An authorization token returned by the API.
     */
    async loginAsGuest<R extends boolean = false>(email: string, emailHMAC: string, raw?: { raw: R }): Promise<MaybeRaw<R, SuccessfulAuth>> {
        const res = await this.axios.put<User>(this.getEndpoint("/v1/guest"), { email, hmac: emailHMAC });

        return (
            raw?.raw ? { ...res, data: { user: res.data, token: res.headers.authorization } } : { user: res.data, token: res.headers.authorization }
        ) as MaybeRaw<R, SuccessfulAuth>;
    }

    /**
     * Checks whether an email corresponds to a guest account.
     *
     * @param email - The email address to check.
     * @returns A promise resolving to one of:
     *   - `"no user"` → No user exists with the given email.
     *   - `"not guest"` → A user exists but is not a guest.
     *   - `"guest"` → The email belongs to a guest account.
     */
    async isGuest<R extends boolean = false>(email: string, raw?: { raw: R }): Promise<MaybeRaw<R, "no user" | "not guest" | "guest">> {
        const res = await this.axios.get<"no user" | "not guest" | "guest">(this.getEndpoint(`/v1/guest/email/${email}`));

        return (raw?.raw ? res : res.data) as MaybeRaw<R, "no user" | "not guest" | "guest">;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
