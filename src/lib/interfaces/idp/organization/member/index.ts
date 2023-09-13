import { ReducedOrganization, OrganizationRole } from "..";
import { ReducedUser } from "../../user";

export interface OrganizationMember {
    _id: string;
    organization: ReducedOrganization;
    user: ReducedUser;
    role: OrganizationRole;
    createDate: number;
    modifyDate: number;
}

export interface AddOrganizationMember {
    email: string;
    role: OrganizationRole;
}

export interface PatchOrgMember {
    role: OrganizationRole;
}
