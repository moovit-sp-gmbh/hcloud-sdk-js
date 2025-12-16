export type OAuthDeviceAuthorizationResponse = {
    device_code: string;
    user_code: string;
    verification_uri: string;
    verification_uri_complete: string;
    expires_in: number;
    interval: number;
};

export type OAuthDeviceTokenResponse =
    | {
          access_token: string;
          token_type: string;
          expires_in: number;
          refresh_token: string;
          scope: string;
          id_token: string;
      }
    | {
          error:
              | "invalid_request"
              | "invalid_client"
              | "invalid_grant"
              | "unauthorized_client"
              | "unsupported_grant_type"
              | "invalid_scope"
              | "authorization_pending"
              | "slow_down"
              | "access_denied"
              | "expired_token";
      };
