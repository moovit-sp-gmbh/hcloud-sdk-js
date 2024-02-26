import { ReducedOrganization } from "../idp/organization";
import { ReducedUser } from "../idp/user";

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
