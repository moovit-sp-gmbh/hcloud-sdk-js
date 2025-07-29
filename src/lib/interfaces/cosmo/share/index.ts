import { ReducedUser } from "../../idp";

export interface Share {
    id: string;
    name: string;
    creator: ReducedUser;
    createDate: number;
    items: Map<string, string[]>;
}

export interface ShareCreate extends Omit<Share, "id" | "createDate" | "creator"> {
    password?: string;
    expires?: number;
    namespaces?: Map<string, string[]>;
}
