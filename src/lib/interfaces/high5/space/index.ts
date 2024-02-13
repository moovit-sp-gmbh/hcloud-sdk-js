import { Space, SpaceEntity } from "../../global";

type ExtendWith<T1, T2> = T1 & T2;

export interface High5Space extends Space {
    permissions: ExtendWith<High5SpaceEntityPermission, { name: string }>[];
    waveEngine: string;
}
export interface High5SpaceEntityPermission {
    entityId: string;
    type: SpaceEntity;
    permission: High5SpacePermission;
}

export enum High5SpacePermission {
    NONE = "NONE",
    READ = "READ",
    EXECUTE = "EXECUTE",
    WRITE = "WRITE",
    MANAGE = "MANAGE",
    OWNER = "OWNER",
}
