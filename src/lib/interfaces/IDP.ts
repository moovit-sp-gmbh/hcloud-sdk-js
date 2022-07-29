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
    roles: string[];
}

export enum OrganizationMemberRole {
    ADMIN = "admin",
    MAINTAINER = "maintainer",
    USER = "user",
}

export interface SuccessfulAuth {
    user: User;
    token: string;
}
