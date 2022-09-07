export interface User {
    _id: string;
    name: string;
    email: string;
    company?: string;
    activeOrganizationId: string;
    createDate: number;
    modifyDate: number;
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
    createDate: number;
    modifyDate: number;
}

export interface OrganizationMember {
    _id: string;
    organizationId: string;
    user: User;
    permission: OrganizationPermission;
    createDate: number;
    modifyDate: number;
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

export interface OrganizationSearchFilter {
    name?: string;
    creatorId?: string;
    company?: string;
    isUserOrganization?: boolean;
    createDateFilter?: SearchDateFilter;
    modifyDateFilter?: SearchDateFilter;
}

interface SearchDateFilter {
    date: number;
    searchDateOperator: SearchDateOperator;
}

enum SearchDateOperator {
    "$eq", // equal
    "$ne", // noEqual
    "$gte", // greaterThanOrEqual
    "$gt", // greaterThan
    "$lte", // lowerThanOrEqual
    "$lt", // lowerThan
}