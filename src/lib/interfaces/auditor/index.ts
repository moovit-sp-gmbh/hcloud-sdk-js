import { LicenseTier, Organization } from "../idp";

export enum Level {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug",
}

export enum Origin {
    IDP = "idp",
    High5 = "high5",
    Auditor = "auditor",
    Mailer = "mailer",
    Fuse = "fuse",
    Mothership = "mothership",
    Dali = "dali",
    Shorts = "shorts",
    Cosmo = "cosmo",
}

export enum Event {
    Login = "login",
    Logout = "logout",
    User = "user",
    Organization = "organization",
    OrganizationMember = "organizationMember",
    Team = "team",
    Space = "space",
    Event = "event",
    Stream = "stream",
    Mail = "mail",
    Webhook = "webhook",
    Job = "job",
    Cronjob = "cronjob",
    Secret = "secret",
    Agent = "agent",
    Avatar = "avatar",
    ServiceAccount = "serviceAccount",
    Database = "database",
    Document = "document",
    Asset = "asset",
    Share = "share",
    Role = "role",
    Group = "group",
}

export enum Type {
    Read = "read",
    Write = "write",
    Create = "create",
    Update = "update",
    Delete = "delete",
    Execute = "execute",
    Connect = "connect",
    Disconnect = "disconnect",
    Add = "add",
    Remove = "remove",
    Send = "send",
    Receive = "receive",
}

export interface AuditLog {
    _id: string;
    correlationId: string;
    level: Level;
    origin: Origin;
    organizationId: string;
    event: Event;
    space?: string;
    user: string;
    type?: Type;
    timestamp: number;
    message?: unknown;
    expireAt: Date;
    requestorIp: string;
    assetId?: string;
}

export interface AuditLogCreate {
    level: Level;
    origin: Origin;
    organization: Pick<Organization, "_id" | "name"> & { license?: LicenseTier };
    event: Event;
    space?: string;
    type?: Type;
    message?: unknown;
    requestorIp: string;
    assetId?: string;
    preventTTL?: boolean;
}
