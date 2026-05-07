import { Scope } from "../user/Scopes";

export type OAuthTokenRequest =
    | ({
          code: string;
          client_id: string;
          redirect_uri: string;
          grant_type: GrantType.AUTHORIZATION_CODE;
      } & (
          | {
                client_secret: string;
                /**
                 * @see https://datatracker.ietf.org/doc/html/rfc7636#section-4.5
                 */
                code_verifier?: string;
            }
          | {
                /**
                 * @see https://datatracker.ietf.org/doc/html/rfc7636#section-4.5
                 */
                code_verifier: string;
            }
      ))
    | {
          grant_type: GrantType.REFRESH_TOKEN;
          refresh_token: string;
      };

export interface OAuthToken {
    id_token?: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: number;
    scope?: Scope[];
}

export enum GrantType {
    AUTHORIZATION_CODE = "authorization_code",
    REFRESH_TOKEN = "refresh_token",
}

export interface OAuthMetadata {
    issuer: string;
    authorization_endpoint: string;
    token_endpoint: string;
    device_authorization_endpoint: string;
    device_token_endpoint: string;
    jwks_uri?: string;
    userinfo_endpoint?: string;
    http_logout_supported: boolean;
    end_session_endpoint?: string;
    scopes_supported: Scope[];
    response_types_supported: string[];
    grant_types_supported: string[];
    token_endpoint_auth_methods_supported: string[];
    token_endpoint_auth_signing_alg_values_supported: string[];
    service_documentation: string[];
    ui_locales_supported: string[];
}
