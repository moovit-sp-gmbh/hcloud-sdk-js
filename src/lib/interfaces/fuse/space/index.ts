import { ReducedSpace, Space, SpaceEntity } from "../../global";
import { ReducedOrganization } from "../../idp";

export interface FuseSpace extends Space {
    highestPermissionOfUser: FuseSpacePermission;
}

export interface FuseSpaceEntityPermission {
    organization: ReducedOrganization;
    space: ReducedSpace;
    entityId: string;
    entityName: string;
    type: SpaceEntity;
    permission: FuseSpacePermission;
    avatarUrl: string;
}

export enum FuseSpacePermission {
    NONE = "NONE",
    READ = "READ",
    WRITE = "WRITE",
    MANAGE = "MANAGE",
    OWNER = "OWNER",
}
