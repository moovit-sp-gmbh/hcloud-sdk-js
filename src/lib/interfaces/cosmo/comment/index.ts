import { ReducedUser } from "../../idp";

export interface CreateComment {
    id: string;
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
    text: string;
    id: string;
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
