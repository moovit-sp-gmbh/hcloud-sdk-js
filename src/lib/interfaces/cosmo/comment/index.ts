import { ReducedUser } from "../../idp"

export interface CreateComment {
    refId: string;
    text: string;
    timestamp?: Timestamp;
    annotation?: string;
    mentions?: string[];
}

export interface EditComment {
    text: string;
    timestamp?: Timestamp;
    annotation?: string;
    mentions?: string[];
}

export interface Comment {
    _id: string;
    text: string;
    createDate: number;
    timestamp?: Timestamp;
    creator: ReducedUser;
    annotation?: string;
    mentions?: ReducedUser[];
    replies?: Reply[];
}

export interface Reply {
    _id: string;
    text: string;
    createDate: number;
    creator: ReducedUser;
    mentions?: ReducedUser[];
}

export interface Timestamp {
    in: number;
    out: number;
    color: string;
}
