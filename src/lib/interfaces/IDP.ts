export interface User {
    _id: string;
    name: string;
    email: string;
    company?: string;
    activeOrganizationId: string;
}

export interface PatchUser {
    name?: string;
    email?: string;
    company?: string;
    activeOrganizationId?: string;
}

export interface Organization {
    _id: string;
    name: string;
    isUserOrganization: boolean;
    company: string;
    creator: User;
}

export interface OrganizationMember {
    _id: string;
    organizationId: string;
    user: User;
    permission: OrganizationPermission;
}

export interface AddOrganizationMember {
    email: string;
    permission: OrganizationPermission;
}

export enum OrganizationPermission {
    READ = "READ", // Part of org, but cannot change anything
    MANAGE = "MANAGE", // Can update members
    ADMIN = "ADMIN", // Can update org and members
    OWNER = "OWNER", // Can update org, members, and delete org
}

export interface PatchOrgMember {
    patchUserId: string;
    permission: OrganizationPermission;
}

export interface SuccessfulAuth {
    user: User;
    token: string;
}
