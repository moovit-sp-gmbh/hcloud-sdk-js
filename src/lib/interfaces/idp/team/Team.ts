import { ReducedOrganization } from "../organization/Organization";
import { ReducedUser } from "../user/User";

export interface Team {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    users: ReducedUser[];
    avatarUrl: string;
    createDate: number;
    modifyDate: number;
    creator: ReducedUser[];
}

export interface ReducedTeam {
    _id: string;
    name: string;
    avatarUrl: string;
}

export enum TeamUsersPatchOperation {
    ADD = "ADD",
    REMOVE = "REMOVE",
    SET = "SET",
}
