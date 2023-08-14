import { ReducedOrganization } from "../idp/organization/Organization";
import { ReducedUser } from "../idp/user/User";
import { HttpMethod, Header } from "../global";

export interface Cronjob {
    _id: string;
    name: string;
    expression: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    space: string;
    targetUrl: string;
    httpMethod: HttpMethod;
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
    httpMethod: HttpMethod;
    acceptInvalidSSL?: boolean;
    timezone?: string;
    description?: string;
    headers?: Header[];
    body?: string;
    enabled?: boolean;
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
