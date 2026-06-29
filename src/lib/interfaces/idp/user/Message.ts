import { ReducedUser } from ".";

export enum MessageSource {
    GLOBAL,
    COSMO,
    HIGH5,
    IDP,
}

export enum MessageType {
    COSMO_ASSET_READY = "ASSET_READY",
    COSMO_COMMENT_MENTION = "MENTION",
    COSMO_USER_ADDED_TO_SPACE = "USER_ADDED_TO_SPACE",
    COSMO_USER_REMOVED_FROM_SPACE = "USER_REMOVED_FROM_SPACE",
    COSMO_ASSET_SHARED = "ASSET_SHARED",
    COSMO_NEW_COMMENT = "NEW_COMMENT",
    COSMO_REPLY_TO_COMMENT = "REPLY_TO_COMMENT",
    COSMO_ASSET_STATUS_CHANGED = "ASSET_STATUS_CHANGED",
    COSMO_NEW_ASSET_UPLOADED = "NEW_ASSET_UPLOADED",
    HIGH5_EXECUTION_FINISHED = "EXECUTION_FINISHED",
    IDP_LOGIN = "LOGINS",
    DIRECT_MESSAGE = "MESSAGES",
}

export enum RecipientType {
    USER = "USER",
    TEAM = "TEAM",
    ORGANIZATION = "ORGANIZATION",
}

export type MessageLevel = "info" | "success" | "warning" | "error";

export interface Message {
    _id: string;
    from: ReducedUser;
    to: ReducedUser;
    source: MessageSource;
    type: MessageType;
    properties: Record<string, unknown>;
    level: MessageLevel;
    read: boolean;
    system: boolean;
    deleted: boolean;
    ttl: number;
    group?: string;
    createDate: number;
}
