import { ReducedOrganization } from "../organization/Organization";
import { ReducedUser } from "../user/User";
import { Scopes } from "../user/Scopes";

export interface OAuthAppCreation {
    name: string;
    description?: string;
    homepage?: string;
    callback: string[];
}

export interface OAuthAppClientSecret {
    name: string;
    secret: string;
    uuid: string;
    creatorId: string;
    used: boolean;
    createDate: number;
    modifyDate: number;
}

export interface OAuthApp {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    avatarUrl: string;
    description?: string;
    homepage?: string;
    callback: string[];
    hcloudClientId: string;
    clientSecrets: OAuthAppClientSecret[];
    scopes: Scopes[];
    patId?: string;
    createDate: number;
    modifyDate: number;
}

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
    scope?: Scopes[];
}

export enum GrantType {
    AUTHORIZATION_CODE = "authorization_code",
    REFRESH_TOKEN = "refresh_token",
}
