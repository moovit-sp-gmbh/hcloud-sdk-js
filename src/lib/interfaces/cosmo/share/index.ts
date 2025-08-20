import { ReducedUser } from "../../idp"

export interface Share {
    _id: string;
    name: string;
    creator: ReducedUser;
    createDate: number;
    items: Map<string, string[]>;
}

export interface ShareCreate extends Omit<Share, "_id" | "createDate" | "creator"> {
    password?: string;
    expires?: number;
    namespaces?: Map<string, string[]>;
    /**
     * Array of emails
     */
    users?: string[];
}

export type ShareWithUsers = Share & {
    users: ReducedUser[];
};
