export enum Level {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug",
}

export enum Origin {
    IDP = "idp",
    High5 = "high5",
}

export enum Event {
    Login = "login",
    Logout = "logout",
    User = "user",
    Organization = "organization",
    App = "app",
    Event = "event",
    Stream = "stream",
}

export enum Type {
    Read = "read",
    Create = "create",
    Update = "update",
    Delete = "delete",
    Execute = "execute",
    Connect = "connect",
    Disconnect = "disconnect",
    Add = "add",
    Remove = "remove",
}

export interface AuditLog {
    level: Level;
    origin: Origin;
    organization?: string;
    event: Event;
    user: string;
    type?: Type;
    timestamp: number;
    message?: any;
}