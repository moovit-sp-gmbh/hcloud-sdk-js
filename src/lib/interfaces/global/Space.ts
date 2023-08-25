import { ReducedOrganization } from "../idp/organization";
import { ReducedUser } from "../idp/user";

type ExtendWith<T1, T2> = T1 & T2;

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
    permissions: ExtendWith<SpaceEntityPermission, { name: string }>[];
    createDate: number;
    modifyDate: number;
}

export interface ReducedSpace {
    _id: string;
    name: string;
    avatarUrl: string;
}
