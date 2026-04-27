import { ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";

export interface Database {
    _id: string;
    name: string;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    createDate: number;
}

export enum ApiKeyPermission {
    READ = "read",
    WRITE = "write",
}

export interface ApiKey {
    _id: string;
    name: string;
    hash: string;
    permission: ApiKeyPermission;
    databaseId: string;
    spaceId: string;
    organizationId: string;
    userId: string;
    createDate: number;
    lastUsed: number;
}
