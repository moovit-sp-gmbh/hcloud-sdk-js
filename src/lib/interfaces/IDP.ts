export interface User {
    _id: string;
    name: string;
    email: string;
    company?: string;
    activeOrganizationId: string;
    twoFactor?: {
        totp: boolean;
    };
    createDate: number;
    modifyDate: number;
    activeScopes: Scopes[];
}

export enum GrantType {
    AUTHORIZATION_CODE = "authorization_code",
    REFRESH_TOKEN = "refresh_token",
}

export enum Scopes {
    HCLOUD_FULL = "hcloud:full",
    IDP_EMAIL_READ = "idp:email:read",
    IDP_USER_READ = "idp:user:read",
    IDP_USER_WRITE = "idp:user:write",
    IDP_USER_DELETE = "idp:user:delete",
    IDP_USER_OPEN_ID = "openid", // This is a special scope for OpenID Connect in the OAuth flow
    IDP_ORGANIZATION_READ = "idp:organization:read",
    IDP_ORGANIZATION_WRITE = "idp:organization:write",
    IDP_ORGANIZATION_DELETE = "idp:organization:delete",
    IDP_ORGANIZATION_ADMIN = "idp:organization:admin",
    HIGH5_APP_READ = "high5:app:read",
    HIGH5_APP_EXECUTE = "high5:app:execute",
    HIGH5_APP_WRITE = "high5:app:write",
    HIGH5_APP_DELETE = "high5:app:delete",
    FUSE_APP_READ = "fuse:app:read",
    FUSE_APP_EXECUTE = "fuse:app:execute",
    FUSE_APP_WRITE = "fuse:app:write",
    FUSE_APP_DELETE = "fuse:app:delete",
}

export interface Pat {
    _id: string;
    name: string;
    expiration?: number;
    scopes: Scopes[];
    userId: string;
    token: string;
    jwt: string;
    modifyDate: number;
}

export interface PatCreate {
    name: string;
    expiration?: number;
    scopes: Scopes[];
}

export interface PatUpdate {
    name: string;
    scopes: Scopes[];
}

export interface PatchUser {
    name?: string;
    email?: string;
    company?: string;
    activeOrganizationId?: string;
}

export interface Organization {
    _id: string;
    name: string;
    isUserOrganization: boolean;
    company: string;
    creator: User;
    createDate: number;
    modifyDate: number;
}

export interface OrganizationWithPermission {
    _id: string;
    name: string;
    isUserOrganization: boolean;
    company: string;
    creator: User;
    createDate: number;
    modifyDate: number;
    permission: OrganizationPermission;
}

export interface OrganizationMember {
    _id: string;
    organizationId: string;
    user: User;
    permission: OrganizationPermission;
    createDate: number;
    modifyDate: number;
}

export interface AddOrganizationMember {
    email: string;
    permission: OrganizationPermission;
}

export enum OrganizationPermission {
    READ = "READ", // Part of org, but cannot change anything
    MANAGE = "MANAGE", // Can update members
    ADMIN = "ADMIN", // Can update org and members
    OWNER = "OWNER", // Can update org, members, and delete org
}

export interface PatchOrgMember {
    permission: OrganizationPermission;
}

export interface SuccessfulAuth {
    user: User;
    token: string;
}

export interface OrganizationSearchFilter {
    name?: string;
    creatorId?: string;
    company?: string;
    isUserOrganization?: boolean;
    createDateFilter?: SearchDateFilter;
    modifyDateFilter?: SearchDateFilter;
}

interface SearchDateFilter {
    date: number;
    searchDateOperator: SearchDateOperator;
}

enum SearchDateOperator {
    "$eq", // equal
    "$ne", // noEqual
    "$gte", // greaterThanOrEqual
    "$gt", // greaterThan
    "$lte", // lowerThanOrEqual
    "$lt", // lowerThan
}

export interface DeactivatedTotp {
    activated: boolean;
    otpAuthUrl: string;
    qrcode: string;
    createDate: number;
    modifyDate: number;
}
export interface ActivatedTotp {
    activated: boolean;
    recoverCodes: string[];
    createDate: number;
    modifyDate: number;
}

export interface OAuthTokenRequest {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

export default interface OAuthAppCreation {
    name: string;
    secretName: string;
    avatar?: string;
    description?: string;
    homepage?: string;
    callback: string;
}

export default interface OAuthApp {
    _id: string;
    name: string;
    organizationId: string;
    creatorId: string;
    avatar?: string;
    description?: string;
    homepage?: string;
    callback: string;
    hcloudClientId: string;
    clientSecrets: OAuthAppClientSecret[];
    scopes: Scopes[];
    patId?: string;
    createDate: number;
    modifyDate: number;
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

interface Region {
    name: string;
    id: string;
    server: string;
}

export interface PublicConfig {
    reCAPTCHA: string;
    regions: Region[];
}
