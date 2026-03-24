import { ReducedUser } from "../user";
import { License } from "./license";
import { ReducedTeam } from "./team";

export * from "./license";
export * from "./stats";

export enum OrganizationRole {
    MAYBE_GUEST = "MAYBE_GUEST", // Role used for guests that have actually (or maybe) no access to an org
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
    teamsOfUser?: ReducedTeam[];
    membersSample?: ReducedUser[];
    totalMemberCount?: number;
    license?: License;
}

export type ReducedOrganization = Pick<Organization, "_id" | "name" | "avatarUrl">;

export type OrganizationQueryOptions = {
    getTeamsOfUser?: boolean;
    getMembersSample?: number; // Number of members to return
    getTotalMemberCount?: boolean;
    getLicense?: boolean;
};
