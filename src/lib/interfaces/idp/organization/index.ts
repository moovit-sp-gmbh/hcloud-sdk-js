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
    roleOfUser: OrganizationRole;
    createDate: number;
    modifyDate: number;
}

export interface OrganizationQueryOptions {
    teamsOfUser?: boolean;
    membersSample?: number; // number of members to return
}

export type ExtraFields<T extends OrganizationQueryOptions> = (T["teamsOfUser"] extends true
    ? { teamsOfUser: ReducedTeam[] }
    : Record<string, never>) &
    (T["membersSample"] extends number ? { membersSample: ReducedUser[]; totalMembersCount: number } : Record<string, never>);

export type OrganizationExtended<T extends OrganizationQueryOptions> = Organization & ExtraFields<T>;

export type ReducedOrganization = Pick<Organization, "_id" | "name" | "avatarUrl">;
