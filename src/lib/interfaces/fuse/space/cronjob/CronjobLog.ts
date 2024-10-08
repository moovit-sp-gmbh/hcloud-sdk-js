import { Header, ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";

export interface CronjobLogDto {
    _id: string;
    cronjobId: string;
    statusCode: number;
    organization: ReducedOrganization;
    creator: ReducedUser;
    space: ReducedSpace;
    headers?: Header[];
    body?: string;
    createDate: number;
    modifyDate: number;
}

export type CronjobLogCreate = Pick<CronjobLogDto, "statusCode" | "headers" | "body">;
