import { Space, SpacePermission, Header, HttpMethodEnum } from "./Global";
import { ReducedOrganization, ReducedUser } from "./IDP";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FuseSpace extends Space {}

export interface Cronjob {
    _id: string;
    name: string;
    expression: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    space: string;
    targetUrl: string;
    httpMethod: HttpMethodEnum;
    acceptInvalidSSL: boolean;
    timezone: string;
    description?: string;
    headers?: Header[];
    body?: string;
    enabled?: boolean;
    createDate: number;
    modifyDate: number;
    nextExecution?: number;
}

export interface CreateCronjob {
    name: string;
    expression: string;
    targetUrl: string;
    httpMethod: HttpMethodEnum;
    acceptInvalidSSL?: boolean;
    timezone?: string;
    description?: string;
    headers?: Header[];
    body?: string;
    enabled?: boolean;
}

export interface UpdateFuseSpace {
    name?: string;
    permissions?: SpacePermission[];
    organizationId?: string;
}

export interface CronjobLogCreation {
    statusCode: number;
    headers?: Header[];
    body: string;
}

export interface CronjobLogDto {
    _id: string;
    cronjobId: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    space: string;
    headers?: Header[];
    body?: string;
    createDate: number;
    modifyDate: number;
}
