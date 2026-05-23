import { ReducedTeam, ReducedUser } from "../../idp";

export interface CreateComment {
    refId: string;
    text: string;
    timestamp?: Timestamp;
    annotation?: string;
    mentions?: string[];
    mentionsTeams?: string[];
}

export interface EditComment {
    text: string;
    timestamp?: Timestamp;
    annotation?: string;
    mentions?: string[];
    mentionsTeams?: string[];
    completed?: boolean;
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

export interface Comment {
    _id: string;
    text: string;
    createDate: number;
    timestamp?: Timestamp;
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
    color: CommentColor;
}
