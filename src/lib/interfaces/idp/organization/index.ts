import { ReducedUser } from "../user";
import { ReducedTeam } from "./team";

export enum OrganizationRole {
    MEMBER = "MEMBER", // Part of org, but cannot change anything
    MANAGER = "MANAGER", // Can update members
    ADMIN = "ADMIN", // Can update org and members
    OWNER = "OWNER", // Can update org, members, and delete org
}

export interface Organization {
    _id: string;
    name: string;
    isUserOrganization: boolean;
    company: string;
    creator: ReducedUser;
    avatarUrl: string;
    membersCount?: number;
    createDate: number;
    modifyDate: number;
}

export interface OrganizationWithUserRole extends Organization {
    role: OrganizationRole;
}

export interface OrganizationWithUserRoleAndTeams extends OrganizationWithUserRole {
    teams: ReducedTeam[];
}

export type ReducedOrganization = Pick<Organization, "_id" | "name" | "avatarUrl">;
