import { App, AppPermission, Header, HttpMethodEnum } from "./Global";
import { ReducedOrganization, ReducedUser } from "./IDP";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FuseApp extends App {}

export interface Cronjob {
    _id: string;
    name: string;
    expression: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    app: string;
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

export interface UpdateFuseApp {
    name?: string;
    permissions?: AppPermission[];
    organizationId?: string;
}
