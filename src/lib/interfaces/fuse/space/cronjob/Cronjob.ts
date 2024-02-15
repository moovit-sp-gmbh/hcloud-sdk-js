import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";
import { HttpMethod, Header, ReducedSpace } from "../../../global";

export interface Cronjob {
    _id: string;
    name: string;
    expression: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    space: ReducedSpace;
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
    nextExecution?: number[];
}

export type CronjobCreate = Pick<Cronjob, "name" | "expression" | "targetUrl" | "httpMethod" | "headers" | "body" | "enabled" | "description"> &
    Partial<Pick<Cronjob, "acceptInvalidSSL" | "timezone">>;
