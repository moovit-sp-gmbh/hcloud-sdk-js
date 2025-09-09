import { ReducedUser } from "../../idp";
import { Item } from "../asset";

export interface Share {
    _id: string;
    name: string;
    creator: ReducedUser;
    createDate: number;
    items: Record<string, string[]>;
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

export type ShareDetails = Omit<ShareWithUsers, "items"> & {
    items: Record<string, { item: Pick<Item, "_id" | "name" | "type">; permissions: string[] }>;
};

export type SharePatch = Omit<ShareCreate, "users" | "items" | "namespaces"> & {
    items?: Record<string, string[] | null>;
    namespaces?: Record<string, string[] | null>;
};
