import { ReducedUser } from ".";

export enum MessageType {
    SYSTEM = "SYSTEM",
    USER = "USER",
}

export enum RecipientType {
    USER = "USER",
    TEAM = "TEAM",
    ORGANIZATION = "ORGANIZATION",
}

export interface Message {
    _id: string;
    from: ReducedUser;
    to: ReducedUser;
    title?: string;
    subject?: string;
    message: string;
    read: boolean;
    type: MessageType;
    createDate: number;
    link?: string;
}
