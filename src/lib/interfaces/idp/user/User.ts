import { Scopes } from "./Scopes";

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
    activeScopes: Scopes[];
}

export interface ReducedUser {
    _id: string;
    name: string;
    avatarUrl: string;
}

export interface PatchUser {
    name?: string;
    email?: string;
    company?: string;
    activeOrganization?: string;
}
