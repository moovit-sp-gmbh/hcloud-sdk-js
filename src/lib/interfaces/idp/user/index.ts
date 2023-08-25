import { Scope } from "./Scopes";

export interface User {
    _id: string;
    name: string;
    email: string;
    company?: string;
    avatarUrl: string;
    activeOrganization: string;
    twoFactor?: {
        totp: boolean;
    };
    createDate: number;
    modifyDate: number;
    activeScopes: Scope[];
}

export type ReducedUser = Pick<User, "_id" | "name" | "avatarUrl">;

export interface PatchUser {
    name?: string;
    email?: string;
    company?: string;
    activeOrganization?: string;
}
