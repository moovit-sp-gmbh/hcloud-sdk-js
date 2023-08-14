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
