import { Space, SpaceEntity } from "../../global";

type ExtendWith<T1, T2> = T1 & T2;

export interface FuseSpace extends Space {
    permissions: ExtendWith<FuseSpaceEntityPermission, { name: string }>[];
}
export interface FuseSpaceEntityPermission {
    entityId: string;
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
