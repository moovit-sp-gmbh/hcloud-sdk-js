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
}

export enum Event {
    Login = "login",
    Logout = "logout",
    User = "user",
    Organization = "organization",
    OrganizationMember = "organizationMember",
    Team = "team",
    App = "app",
    Event = "event",
    Stream = "stream",
    Mail = "mail",
    Webhook = "webhook",
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
    organization?: string;
    event: Event;
    type?: Type;
    message?: unknown;
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
