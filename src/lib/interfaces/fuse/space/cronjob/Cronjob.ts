import { Header, HttpMethod, ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";

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
    lastStatus?: number;
    lastTriggered?: number;
}

export type CronjobCreate = Pick<
    Cronjob,
    "name" | "expression" | "targetUrl" | "httpMethod" | "headers" | "body" | "enabled" | "description" | "lastStatus" | "lastTriggered"
> &
    Partial<Pick<Cronjob, "acceptInvalidSSL" | "timezone">>;
