import { ReducedUser } from "../user";
import { ReducedTeam } from "./team";

export enum OrganizationPermission {
    MEMBER = "MEMBER", // Part of org, but cannot change anything
    MANAGE = "MANAGE", // Can update members
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

export interface OrganizationWithPermission extends Organization {
    permission: OrganizationPermission;
}

export interface OrganizationWithPermissionAndTeams extends OrganizationWithPermission {
    teams: ReducedTeam[];
}

export type ReducedOrganization = Pick<Organization, "_id" | "name" | "avatarUrl">;
