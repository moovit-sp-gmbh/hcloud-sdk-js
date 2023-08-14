import { Scopes } from "./Scopes";
import { ReducedUser } from "./User";

export interface Pat {
    _id: string;
    name: string;
    expiration?: number;
    scopes: Scopes[];
    user: ReducedUser;
    token: string;
    jwt: string;
    modifyDate: number;
}

export interface PatCreate {
    name: string;
    expiration?: number;
    scopes: Scopes[];
}

export interface PatUpdate {
    name: string;
    scopes: Scopes[];
}
