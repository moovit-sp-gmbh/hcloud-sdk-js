import { ReducedTeam, ReducedUser } from "../../idp"

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
}

export enum CommentType {
    COMMENT = "COMMENT",
    REPLY = "REPLY",
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
}

export interface Reply extends Omit<Comment, "timestamp" | "replies"> {
    commentRef: string;
}

export interface Timestamp {
    in: number;
    out: number;
    color: string;
}
