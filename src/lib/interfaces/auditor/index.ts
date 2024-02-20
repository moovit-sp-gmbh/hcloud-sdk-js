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
    Agent = "agent",
    Avatar = "avatar",
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
}
