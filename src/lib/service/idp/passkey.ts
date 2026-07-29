import Base, { MaybeRaw } from "../../Base";
import {
    Passkey,
    PasskeyAuthenticationCredential,
    PasskeyAuthenticationOptions,
    PasskeyRegistrationCredential,
    PasskeyRegistrationOptions,
} from "../../interfaces/idp/user/Passkey";
import { SuccessfulAuth } from "../../interfaces/idp/user/SuccessfulAuth";

export class IdpPasskey extends Base {
    /**
     * Requests options for registering a new passkey for the currently authenticated user. Pass the returned object
     * into `navigator.credentials.create()` to have the browser/authenticator create a new credential, then submit
     * the result to {@link verifyRegistration}.
     * @returns PasskeyRegistrationOptions object to be passed into `navigator.credentials.create()`
     */
    async createRegistrationOptions<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, PasskeyRegistrationOptions>> {
        const resp = await this.axios.post<PasskeyRegistrationOptions>(this.getEndpoint("/v1/user/passkey/options"));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, PasskeyRegistrationOptions>;
    }

    /**
     * Verifies a newly created passkey credential and, if valid, stores it for the currently authenticated user.
     * @param credential The credential returned by `navigator.credentials.create()`, together with a user-friendly name for the passkey
     * @returns The newly stored Passkey
     */
    async verifyRegistration<R extends boolean = false>(credential: PasskeyRegistrationCredential, raw?: { raw: R }): Promise<MaybeRaw<R, Passkey>> {
        const resp = await this.axios.post<Passkey>(this.getEndpoint("/v1/user/passkey/verify"), credential);
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Passkey>;
    }

    /**
     * Requests all passkeys registered for the currently authenticated user.
     * @returns Array of Passkey objects
     */
    async getPasskeys<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, Passkey[]>> {
        const resp = await this.axios.get<Passkey[]>(this.getEndpoint("/v1/user/passkey"));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Passkey[]>;
    }

    /**
     * Deletes a passkey registered for the currently authenticated user.
     * @param credentialId Base64url-encoded credential ID of the passkey to delete
     */
    async deletePasskey<R extends boolean = false>(credentialId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/user/passkey/${encodeURIComponent(credentialId)}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Requests options for logging in with a passkey. This endpoint requires no authentication and does not identify
     * the user upfront - any passkey registered for this relying party may be used. Pass the returned object into
     * `navigator.credentials.get()` to have the browser/authenticator produce an assertion, then submit the result
     * to {@link verifyAuthentication}.
     * @returns PasskeyAuthenticationOptions object to be passed into `navigator.credentials.get()`
     */
    async createAuthenticationOptions<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, PasskeyAuthenticationOptions>> {
        const resp = await this.axios.post<PasskeyAuthenticationOptions>(this.getEndpoint("/v1/auth/passkey/options"));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, PasskeyAuthenticationOptions>;
    }

    /**
     * Verifies a passkey authentication assertion. This endpoint requires no authentication. On success, the user is
     * logged in and the response carries the Authorization header and auth_token cookie of the new session.
     * @param credential The credential returned by `navigator.credentials.get()`
     * @returns SuccessfulAuth object holding the token and the authenticated user
     */
    async verifyAuthentication<R extends boolean = false>(
        credential: PasskeyAuthenticationCredential,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, SuccessfulAuth>> {
        const resp = await this.axios.post(this.getEndpoint("/v1/auth/passkey/verify"), credential);

        const authed: SuccessfulAuth = {
            token: resp.headers["authorization"]?.toString() || "",
            user: resp.data,
        };
        return (raw?.raw ? { ...resp, data: authed } : authed) as MaybeRaw<R, SuccessfulAuth>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
