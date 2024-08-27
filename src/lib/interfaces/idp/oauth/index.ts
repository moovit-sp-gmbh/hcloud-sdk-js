import { Scope } from "../user/Scopes";

export interface OAuthTokenRequest {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
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
