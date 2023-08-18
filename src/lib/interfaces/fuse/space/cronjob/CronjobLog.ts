import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";
import { Header } from "../../../global";

export interface CronjobLogCreation {
    statusCode: number;
    headers?: Header[];
    body: string;
}

export interface CronjobLogDto {
    _id: string;
    cronjobId: string;
    statusCode: number;
    organization: ReducedOrganization;
    creator: ReducedUser;
    creatorId: string;
    space: string;
    headers?: Header[];
    body?: string;
    createDate: number;
    modifyDate: number;
}
