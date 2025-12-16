/* eslint-disable camelcase */
import Base, { MaybeRaw } from "../../../Base";
import { OAuthAppPublicInfo, Scope } from "../../../interfaces/idp";
import { OAuthDeviceAuthorizationResponse, OAuthDeviceTokenResponse } from "../../../interfaces/idp/oauth/device";

/**
 * IdpOAuthDevice
 *
 * Client wrapper for OAuth 2.0 Device Authorization Grant (RFC 8628).
 *
 * This class provides methods to:
 * - Initiate a device authorization request
 * - Validate a user-provided code
 * - Approve or reject a device authorization
 * - Exchange a device code for an access token
 *
 * All methods support returning either the parsed response body or the raw Axios
 * response via the `{ raw: true }` option.
 *
 * @extends Base
 */
export default class IdpOAuthDevice extends Base {
    /**
     * Initiates the OAuth Device Authorization flow.
     *
     * This endpoint returns a `device_code` and `user_code` which should be:
     * - Displayed to the user on the device
     * - Entered by the user on a separate verification page
     *
     * @typeParam R - Whether to return the raw Axios response
     *
     * @param clientId - OAuth client identifier
     * @param scope - Optional OAuth scope string (space-delimited)
     * @param raw - Optional flag to return the raw Axios response
     *
     * @returns Device authorization response or raw Axios response
     */
    async authorize<R extends boolean = false>(
        clientId: string,
        scope?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OAuthDeviceAuthorizationResponse>> {
        const resp = await this.axios.post<OAuthDeviceAuthorizationResponse>(
            this.getEndpoint(`/v1/login/oauth/device/authorize`),
            {
                client_id: clientId,
                scope,
            },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OAuthDeviceAuthorizationResponse>;
    }

    /**
     * Validates a user-entered device code.
     *
     * This is typically called by the authorization UI after the user enters
     * the `user_code`. It returns public information about the requesting
     * application and the requested scopes.
     *
     * @typeParam R - Whether to return the raw Axios response
     *
     * @param clientId - OAuth client identifier
     * @param userCode - User-facing verification code
     * @param raw - Optional flag to return the raw Axios response
     *
     * @returns Application public info and requested scopes
     */
    async validateUserCode<R extends boolean = false>(
        clientId: string,
        userCode: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, { app: OAuthAppPublicInfo; scopes: Scope[] }>> {
        const resp = await this.axios.get<{ app: OAuthAppPublicInfo; scopes: Scope[] }>(this.getEndpoint(`/v1/login/oauth/device/authorize`), {
            params: {
                client_id: clientId,
                user_code: userCode,
            },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, { app: OAuthAppPublicInfo; scopes: Scope[] }>;
    }

    /**
     * Approves or rejects a device authorization request.
     *
     * ⚠️ This endpoint requires an `Authorization` header to be set
     * on the HCloud instance (e.g., a logged-in user session or access token).
     *
     * @typeParam R - Whether to return the raw Axios response
     *
     * @param clientId - OAuth client identifier
     * @param userCode - User-facing verification code
     * @param status - Authorization decision (`APPROVED` or `REJECTED`)
     * @param raw - Optional flag to return the raw Axios response
     *
     * @throws Error if the Authorization header is not set
     *
     * @returns Void response or raw Axios response
     */
    async decide<R extends boolean = false>(
        clientId: string,
        userCode: string,
        status: "APPROVED" | "REJECTED",
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        if (this.axios.defaults.headers.common.Authorization === undefined && this.axios.defaults.headers.post.Authorization === undefined) {
            throw new Error("this endpoint requires the authorization header to be set");
        }
        const resp = await this.axios.post<void>(
            this.getEndpoint(`/v1/login/oauth/device/authorize/${clientId}/${userCode}`),
            {
                status,
            },
            { headers: { "Content-Type": "application/json" } }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    /**
     * Approves a device authorization request.
     *
     * Shorthand for {@link decide} with status `"APPROVED"`.
     *
     * @typeParam R - Whether to return the raw Axios response
     *
     * @param clientId - OAuth client identifier
     * @param userCode - User-facing verification code
     * @param raw - Optional flag to return the raw Axios response
     *
     * @returns Void response or raw Axios response
     */
    async approve<R extends boolean = false>(clientId: string, userCode: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        return this.decide(clientId, userCode, "APPROVED", raw);
    }

    /**
     * Rejects a device authorization request.
     *
     * Shorthand for {@link decide} with status `"REJECTED"`.
     *
     * @typeParam R - Whether to return the raw Axios response
     *
     * @param clientId - OAuth client identifier
     * @param userCode - User-facing verification code
     * @param raw - Optional flag to return the raw Axios response
     *
     * @returns Void response or raw Axios response
     */
    async reject<R extends boolean = false>(clientId: string, userCode: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        return this.decide(clientId, userCode, "REJECTED", raw);
    }

    /**
     * Exchanges a device code for an access token.
     *
     * This endpoint may return HTTP 400 responses for non-fatal OAuth states
     * such as `authorization_pending` or `slow_down`. These responses are
     * returned normally and should be handled by the caller.
     *
     * @typeParam R - Whether to return the raw Axios response
     *
     * @param clientId - OAuth client identifier
     * @param deviceCode - Device code obtained from {@link authorize}
     * @param raw - Optional flag to return the raw Axios response
     *
     * @returns Device token response or raw Axios response
     */
    async token<R extends boolean = false>(clientId: string, deviceCode: string, raw?: { raw: R }): Promise<MaybeRaw<R, OAuthDeviceTokenResponse>> {
        const resp = await this.axios.post<OAuthDeviceTokenResponse>(
            this.getEndpoint(`/v1/login/oauth/device/access_token`),
            {
                client_id: clientId,
                device_code: deviceCode,
                grant_type: "urn:ietf:params:oauth:grant-type:device_code",
            },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" }, validateStatus: status => status === 200 || status === 400 }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OAuthDeviceTokenResponse>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
