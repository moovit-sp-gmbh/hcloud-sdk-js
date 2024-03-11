import { ReducedSpace, Space, SpaceEntity } from "../../global";
import { ReducedOrganization } from "../../idp";

export interface FuseSpace extends Space {
    permissionOfUser?: FuseSpacePermission;
}
export interface FuseSpaceEntityPermission {
    entityId: string;
    type: SpaceEntity;
    permission: FuseSpacePermission;
}

export interface FuseSpaceEntityPermission {
    organization: ReducedOrganization;
    space: ReducedSpace;
    entityId: string;
    entityName: string;
    type: SpaceEntity;
    permission: FuseSpacePermission;
}

export enum FuseSpacePermission {
    NONE = "NONE",
    READ = "READ",
    WRITE = "WRITE",
    MANAGE = "MANAGE",
    OWNER = "OWNER",
}
