import { ReducedOrganization, OrganizationPermission } from "..";
import { ReducedUser } from "../../user";

export interface OrganizationMember {
    _id: string;
    organization: ReducedOrganization;
    user: ReducedUser;
    permission: OrganizationPermission;
    createDate: number;
    modifyDate: number;
}

export interface AddOrganizationMember {
    email: string;
    permission: OrganizationPermission;
}

export interface PatchOrgMember {
    permission: OrganizationPermission;
}