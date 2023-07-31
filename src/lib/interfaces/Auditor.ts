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
    Cronjob = "cronjob",
    Secret = "secret",
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
    level: Level;
    origin: Origin;
    organizationId: string;
    event: Event;
    type?: Type;
    message?: unknown;
    user: string;
    timestamp: number;
}

export interface AuditLogFilter {
    origin?: Origin;
    level?: Level;
    event?: Event;
    type?: Type;
    timestamp?: number;
    message?: string;
    userName?: string;
}
