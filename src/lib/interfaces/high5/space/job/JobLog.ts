import { Header, ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";

export interface JobLogDto {
    _id: string;
    jobId: string;
    statusCode: number;
    organization: ReducedOrganization;
    creator: ReducedUser;
    space: ReducedSpace;
    headers?: Header[];
    body?: string;
    createDate: number;
    modifyDate: number;
}

export type JobLogCreate = Pick<JobLogDto, "statusCode" | "headers" | "body">;
