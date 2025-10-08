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
    isAgent?: boolean;
    lastActive: number;
    isGuest?: boolean;
}

export type ReducedUser = Pick<User, "_id" | "name" | "email" | "avatarUrl" | "isGuest" | "isAgent">;

export interface UserPatch {
    name?: string;
    email?: string;
    company?: string;
    activeOrganization?: string;
}
