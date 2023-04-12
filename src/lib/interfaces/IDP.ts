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

export interface ReducedUser {
    _id: string;
    name: string;
}

export interface ReducedOrganization {
    _id: string;
    name: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    company?: string;
    activeOrganization: string;
    twoFactor?: {
        totp: boolean;
    };
    createDate: number;
    modifyDate: number;
    activeScopes: Scopes[];
}

export interface Pat {
    _id: string;
    name: string;
    expiration?: number;
    scopes: Scopes[];
    user: ReducedUser;
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
    activeOrganization?: string;
}

export interface Organization {
    _id: string;
    name: string;
    isUserOrganization: boolean;
    company: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}

export enum OrganizationPermission {
    MEMBER = "MEMBER", // Part of org, but cannot change anything
    MANAGE = "MANAGE", // Can update members
    ADMIN = "ADMIN", // Can update org and members
    OWNER = "OWNER", // Can update org, members, and delete org
}

export interface OrganizationMember {
    _id: string;
    organization: ReducedOrganization;
    user: ReducedUser;
    permission: OrganizationPermission;
    createDate: number;
    modifyDate: number;
}

export interface AddOrganizationMember {
    email: string;
    permission: OrganizationPermission;
}

export interface OrganizationWithPermission {
    _id: string;
    name: string;
    isUserOrganization: boolean;
    company: string;
    creatorId: string;
    createDate: number;
    modifyDate: number;
    permission: OrganizationPermission;
}

export interface PatchOrgMember {
    permission: OrganizationPermission;
}

export interface SuccessfulAuth {
    user: User;
    token: string;
}

enum SearchDateOperator {
    "$eq", // equal
    "$ne", // noEqual
    "$gte", // greaterThanOrEqual
    "$gt", // greaterThan
    "$lte", // lowerThanOrEqual
    "$lt", // lowerThan
}

interface SearchDateFilter {
    date: number;
    searchDateOperator: SearchDateOperator;
}

export interface OrganizationSearchFilter {
    name?: string;
    creatorId?: string;
    company?: string;
    isUserOrganization?: boolean;
    createDateFilter?: SearchDateFilter;
    modifyDateFilter?: SearchDateFilter;
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

export interface OAuthAppCreation {
    name: string;
    secretName: string;
    avatar?: string;
    description?: string;
    homepage?: string;
    callback: string;
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

export interface Region {
    name: string;
    id: string;
    server: string;
}

export interface Umami {
    id: string;
}

export interface PublicConfig {
    reCAPTCHA: string;
    regions: Region[];
    umami: Umami;
}

export interface Domain {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    verified: boolean;
    uuid: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}
