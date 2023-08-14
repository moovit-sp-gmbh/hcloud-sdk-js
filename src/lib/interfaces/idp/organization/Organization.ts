import { ReducedUser } from "../user/User";
import { ReducedTeam } from "../team/Team";

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

export interface OrganizationWithPermission {
    _id: string;
    name: string;
    isUserOrganization: boolean;
    membersCount: number;
    company: string;
    avatarUrl: string;
    creatorId: string;
    createDate: number;
    modifyDate: number;
    permission: OrganizationPermission;
}

export interface OrganizationWithPermissionAndTeams extends OrganizationWithPermission {
    teams: ReducedTeam[];
}

export interface ReducedOrganization {
    _id: string;
    name: string;
    avatarUrl: string;
}
