import { ReducedUser } from "../../idp";

export interface Share {
    _id: string;
    name: string;
    creator: ReducedUser;
    createDate: number;
    items: string[];
    permissions: string[];
    expires?: number;
    password?: string;
}

export interface ShareCreate extends Omit<Share, "_id" | "createDate" | "creator"> {
    password?: string;
    expires?: number;
    namespaces?: Record<string, string[]>;
    /**
     * Array of emails
     */
    users?: string[];
}

export type ShareWithUsers = Share & {
    users: ReducedUser[];
};

export type SharePatch = Partial<
    Pick<ShareCreate, "name" | "expires" | "password"> & {
        items: string[];
        permissions: string[];
        namespaces: Record<string, string[] | null>;
    }
>;
