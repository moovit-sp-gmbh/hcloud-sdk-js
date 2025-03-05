import { ReducedSpace, Space, SpaceEntity } from "../../global";
import { ReducedOrganization } from "../../idp";

export interface FridaySpace extends Space {
    highestPermissionOfUser: FridaySpacePermission;
}

export interface FridaySpaceEntityPermission {
    organization: ReducedOrganization;
    space: ReducedSpace;
    entityId: string;
    entityName: string;
    type: SpaceEntity;
    permission: FridaySpacePermission;
    avatarUrl: string;
}

export enum FridaySpacePermission {
    NONE = "NONE",
    READ = "READ",
    WRITE = "WRITE",
    MANAGE = "MANAGE",
    OWNER = "OWNER",
}
