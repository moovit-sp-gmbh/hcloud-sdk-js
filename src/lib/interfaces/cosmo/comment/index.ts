import { ReducedTeam, ReducedUser } from "../../idp";

export interface CreateComment {
    refId: string;
    text: string;
    timestamp?: Timestamp;
    color?: CommentColor;
    annotation?: string;
    mentions?: string[];
    mentionsTeams?: string[];
    visibility?: CommentVisibility;
}

export interface EditComment {
    text: string;
    timestamp?: Timestamp;
    color?: CommentColor;
    annotation?: string;
    mentions?: string[];
    mentionsTeams?: string[];
    completed?: boolean;
    visibility?: CommentVisibility;
}

export enum CommentType {
    COMMENT = "COMMENT",
    REPLY = "REPLY",
}

export enum CommentSortField {
    TIMECODE = "TIMECODE",
    CREATOR = "CREATOR",
    NEWEST = "NEWEST",
    OLDEST = "OLDEST",
}

export enum CommentSortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export enum CommentVisibility {
    INTERNAL = "internal",
    EXTERNAL = "external",
}

export interface Comment {
    _id: string;
    text: string;
    createDate: number;
    timestamp?: Timestamp;
    color?: CommentColor;
    creator: ReducedUser;
    assetId: string;
    commentType: CommentType;
    annotation?: string;
    mentions?: ReducedUser[];
    mentionedTeams?: ReducedTeam[];
    replies?: Reply[];
    completed: boolean;
    completedBy?: ReducedUser;
    completedAt?: number;
    visibility?: CommentVisibility;
}

export interface Reply extends Omit<Comment, "timestamp" | "replies"> {
    commentRef: string;
}

export enum CommentColor {
    BLUE = "BLUE",
    CYAN = "CYAN",
    GREEN = "GREEN",
    YELLOW = "YELLOW",
    RED = "RED",
    ORANGE = "ORANGE",
    LAVENDER = "LAVENDER",
    WHITE = "WHITE",
}

export interface Timestamp {
    in: number;
    out?: number;
}
