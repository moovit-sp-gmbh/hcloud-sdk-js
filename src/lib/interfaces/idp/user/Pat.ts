import { Scope } from "./Scopes";
import { ReducedUser } from ".";

export interface Pat {
    _id: string;
    name: string;
    expiration?: number;
    scopes: Scope[];
    user: ReducedUser;
    token: string;
    jwt: string;
    modifyDate: number;
}

export interface PatCreate {
    name: string;
    expiration?: number;
    scopes: Scope[];
    // 2FA TOTP token
    token?: string;
}

export type PatUpdate = Partial<PatCreate>;
