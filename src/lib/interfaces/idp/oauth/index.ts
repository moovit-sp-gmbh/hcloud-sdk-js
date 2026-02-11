import { Scope } from "../user/Scopes";

export interface OAuthTokenRequest {
    code: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    grant_type: GrantType;

    /**
     * @see https://datatracker.ietf.org/doc/html/rfc7636#section-4.5
     */
    code_verifier?: string;
}

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
