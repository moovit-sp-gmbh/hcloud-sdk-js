import { OrganizationRole } from "..";

export interface OrganizationMember {
    _id: string;
    email: string;
    name: string;
    avatarUrl: string;
    role: OrganizationRole;
}

export interface OrgMemberCreate {
    email: string;
    role: OrganizationRole;
}

export interface OrgMemberPatch {
    role: OrganizationRole;
}
