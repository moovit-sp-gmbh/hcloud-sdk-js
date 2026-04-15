import { Header, ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";

export interface ReducedJob {
    _id: string;
    name: string;
}

export interface JobLogDto {
    _id: string;
    job: ReducedJob;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    statusCode: number;
    headers?: Header[];
    payload?: string;
    errorMessage?: string;
    createDate: number;
}

export type JobLogCreate = Pick<JobLogDto, "statusCode" | "headers" | "payload" | "errorMessage">;
