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
export enum SpaceEntity {
    TEAM = "team",
    USER = "user",
}
export interface SpaceEntityPermission {
    entityId: string;
    type: SpaceEntity;
    permission: SpacePermission;
}

export interface Space {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    avatarUrl: string;
    creator: ReducedUser;
    permissions: (SpaceEntityPermission & { name: string })[];
    createDate: number;
    modifyDate: number;
}
