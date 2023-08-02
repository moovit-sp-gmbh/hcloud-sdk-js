import hcloud from "../hcloud";

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
    HIGH5_SPACE_READ = "high5:space:read",
    HIGH5_SPACE_EXECUTE = "high5:space:execute",
    HIGH5_SPACE_WRITE = "high5:space:write",
    HIGH5_SPACE_DELETE = "high5:space:delete",
    FUSE_SPACE_READ = "fuse:space:read",
    FUSE_SPACE_EXECUTE = "fuse:space:execute",
    FUSE_SPACE_WRITE = "fuse:space:write",
    FUSE_SPACE_DELETE = "fuse:space:delete",
}

export const ScopeDependencies = {
    [Scopes.HCLOUD_FULL]: [Object.values(Scopes)[0]],
    [Scopes.IDP_USER_READ]: [Scopes.IDP_EMAIL_READ],
    [Scopes.IDP_USER_OPEN_ID]: [Scopes.IDP_EMAIL_READ],
    [Scopes.IDP_USER_WRITE]: [Scopes.IDP_USER_READ],
    [Scopes.IDP_USER_DELETE]: [Scopes.IDP_USER_READ, Scopes.IDP_USER_WRITE],
    [Scopes.IDP_ORGANIZATION_READ]: [Scopes.IDP_USER_READ],
    [Scopes.IDP_ORGANIZATION_WRITE]: [Scopes.IDP_USER_READ, Scopes.IDP_ORGANIZATION_READ],
    [Scopes.IDP_ORGANIZATION_DELETE]: [Scopes.IDP_USER_READ, Scopes.IDP_ORGANIZATION_READ, Scopes.IDP_ORGANIZATION_WRITE],
    [Scopes.IDP_ORGANIZATION_ADMIN]: [
        Scopes.IDP_USER_READ,
        Scopes.IDP_ORGANIZATION_READ,
        Scopes.IDP_ORGANIZATION_WRITE,
        Scopes.IDP_ORGANIZATION_ADMIN,
    ],
    [Scopes.HIGH5_SPACE_READ]: [Scopes.IDP_USER_READ],
    [Scopes.HIGH5_SPACE_EXECUTE]: [Scopes.IDP_USER_READ, Scopes.HIGH5_SPACE_READ],
    [Scopes.HIGH5_SPACE_WRITE]: [Scopes.IDP_USER_READ, Scopes.HIGH5_SPACE_READ, Scopes.HIGH5_SPACE_EXECUTE],
    [Scopes.HIGH5_SPACE_DELETE]: [Scopes.IDP_USER_READ, Scopes.HIGH5_SPACE_READ, Scopes.HIGH5_SPACE_EXECUTE, Scopes.HIGH5_SPACE_WRITE],
    [Scopes.FUSE_SPACE_READ]: [Scopes.IDP_USER_READ],
    [Scopes.FUSE_SPACE_WRITE]: [Scopes.IDP_USER_READ, Scopes.FUSE_SPACE_READ],
    [Scopes.FUSE_SPACE_DELETE]: [Scopes.IDP_USER_READ, Scopes.FUSE_SPACE_READ, Scopes.FUSE_SPACE_WRITE],
};

export interface ReducedUser {
    _id: string;
    name: string;
}

export interface ReducedOrganization {
    _id: string;
    name: string;
}

export interface ReducedTeam {
    _id: string;
    name: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    company?: string;
    avatarUrl: string;
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
    avatarUrl: string;
    membersCount?: number;
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
    membersCount: number;
    company: string;
    avatarUrl: string;
    creatorId: string;
    createDate: number;
    modifyDate: number;
    permission: OrganizationPermission;
}

export interface OrganizationWithPermissionAndTeams extends OrganizationWithPermission {
    teams: ReducedTeam[];
}

export interface PatchOrgMember {
    permission: OrganizationPermission;
}

export interface SuccessfulAuth {
    user: User;
    token: string;
}

export interface SuccessfulHcloudAuth {
    user: User;
    token: string;
    hcl: hcloud;
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
    secret: string;
    createDate: number;
    modifyDate: number;
}
export interface ActivatedTotp {
    activated: boolean;
    recoverCodes: string[];
    createDate: number;
    modifyDate: number;
}

export interface UserTotp {
    email: string;
    token: string;
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

export enum VerificationStatus {
    verified = "verified",
    waiting = "waiting",
    error = "error",
}

export interface Domain {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    verified: boolean;
    verificationStatus: VerificationStatus;
    uuid: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}

export interface Team {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    users: ReducedUser[];
    avatarUrl: string;
    createDate: number;
    modifyDate: number;
    creator: ReducedUser[];
}

export enum TeamUsersPatchOperation {
    ADD = "ADD",
    REMOVE = "REMOVE",
    SET = "SET",
}

export interface FullSAMLProvider {
    domainName: string;
    ssoLoginURL: string;
    ssoLogoutURL: string;
    certificates: string[];
    allowUnencryptedAssertion: boolean;
}

export interface SAMLProvider {
    ssoLoginURL: string;
    ssoLogoutURL: string;
    certificates: string[];
    allowUnencryptedAssertion: boolean;
}

export interface SAMLProviderCreateDto {
    ssoLoginURL: string;
    ssoLogoutURL: string;
    certificates: string[];
    allowUnencryptedAssertion?: boolean;
}
