import { ReducedUser } from "../../idp";

export interface CreateComment {
    refId: string;
    text: string;
    timestamp: Timestamp;
    annotation: string;
}

export interface EditComment {
    text: string;
    timestamp: Timestamp;
    annotation: string;
}

export interface Comment {
    _id: string;
    text: string;
    createDate: number;
    timestamp?: Timestamp;
    creator: ReducedUser;
    annotation?: string;
}

export interface Timestamp {
    in: number;
    out: number;
    color: string;
}
