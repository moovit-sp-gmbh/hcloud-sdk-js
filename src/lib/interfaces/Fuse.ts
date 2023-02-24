import { App, Header, HttpMethodEnum } from "./Global";

// tslint:disable-next-line no-empty-interface
export interface FuseApp extends App {}

export interface Cronjob {
    _id: string;
    name: string;
    expression: string;
    organizationId: string;
    creatorId: string;
    appId: string;
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
