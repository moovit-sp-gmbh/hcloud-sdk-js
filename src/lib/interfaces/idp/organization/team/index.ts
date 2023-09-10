import { ReducedOrganization } from "..";
import { ReducedUser } from "../../user";

export interface Team {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    users: ReducedUser[];
    avatarUrl: string;
    createDate: number;
    modifyDate: number;
    creator: ReducedUser;
}

export type ReducedTeam = Pick<Team, "_id" | "name" | "avatarUrl">;

export enum TeamUsersPatchOperation {
    ADD = "ADD",
    REMOVE = "REMOVE",
    SET = "SET",
}
