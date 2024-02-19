import { ReducedOrganization } from "../idp/organization";
import { ReducedUser } from "../idp/user";

export enum SpacePermission {
    NONE = "NONE",
    READ = "READ",
    EXECUTE = "EXECUTE",
    WRITE = "WRITE",
    MANAGE = "MANAGE",
    OWNER = "OWNER",
}
export interface SpaceEntityPermission {
    orgId: string;
    spaceId: string;
    entityId: string;
    type: SpaceEntity;
    permission: SpacePermission;
}

export interface SpacePermissionResponse {
    organization: ReducedOrganization;
    space: ReducedSpace;
    entityId: string;
    entityName: string;
    type: SpaceEntity;
    permission: SpacePermission;
}

export interface Space {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    avatarUrl: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}

export interface ReducedSpace {
    _id: string;
    name: string;
    avatarUrl: string;
}

export enum SpaceEntity {
    TEAM = "team",
    USER = "user",
}
