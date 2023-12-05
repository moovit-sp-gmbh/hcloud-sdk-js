import { OrganizationRole } from "..";

export interface OrganizationMember {
    _id: string;
    email: string;
    name: string;
    avatarUrl: string;
    role: OrganizationRole;
}

export interface AddOrganizationMember {
    email: string;
    role: OrganizationRole;
}

export interface PatchOrgMember {
    role: OrganizationRole;
}
