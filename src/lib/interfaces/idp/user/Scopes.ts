export enum Scope {
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
    [Scope.HCLOUD_FULL]: [...Object.values(Scope).filter(s => s !== Scope.HCLOUD_FULL)],
    [Scope.IDP_EMAIL_READ]: [],
    [Scope.IDP_USER_READ]: [],
    [Scope.IDP_USER_WRITE]: [Scope.IDP_USER_READ],
    [Scope.IDP_USER_DELETE]: [Scope.IDP_USER_READ, Scope.IDP_USER_WRITE],
    [Scope.IDP_USER_OPEN_ID]: [Scope.IDP_EMAIL_READ],
    [Scope.IDP_ORGANIZATION_READ]: [Scope.IDP_USER_READ],
    [Scope.IDP_ORGANIZATION_WRITE]: [Scope.IDP_USER_READ, Scope.IDP_ORGANIZATION_READ],
    [Scope.IDP_ORGANIZATION_DELETE]: [Scope.IDP_USER_READ, Scope.IDP_ORGANIZATION_READ, Scope.IDP_ORGANIZATION_WRITE],
    [Scope.IDP_ORGANIZATION_ADMIN]: [Scope.IDP_USER_READ, Scope.IDP_ORGANIZATION_READ, Scope.IDP_ORGANIZATION_WRITE, Scope.IDP_ORGANIZATION_DELETE],
    [Scope.HIGH5_SPACE_READ]: [Scope.IDP_USER_READ],
    [Scope.HIGH5_SPACE_EXECUTE]: [Scope.IDP_USER_READ, Scope.HIGH5_SPACE_READ],
    [Scope.HIGH5_SPACE_WRITE]: [Scope.IDP_USER_READ, Scope.HIGH5_SPACE_READ, Scope.HIGH5_SPACE_EXECUTE],
    [Scope.HIGH5_SPACE_DELETE]: [Scope.IDP_USER_READ, Scope.HIGH5_SPACE_READ, Scope.HIGH5_SPACE_EXECUTE, Scope.HIGH5_SPACE_WRITE],
    [Scope.FUSE_SPACE_READ]: [Scope.IDP_USER_READ],
    [Scope.FUSE_SPACE_EXECUTE]: [],
    [Scope.FUSE_SPACE_WRITE]: [Scope.IDP_USER_READ, Scope.FUSE_SPACE_READ],
    [Scope.FUSE_SPACE_DELETE]: [Scope.IDP_USER_READ, Scope.FUSE_SPACE_READ, Scope.FUSE_SPACE_WRITE],
};