import { ReducedOrganization } from "../../../../../idp/organization/Organization";
import { ReducedUser } from "../../../../../idp/user/User";

export enum NodeCategory {
    CUSTOM = "CUSTOM",
}
export interface Node {
    _id: string;
    secret: string;
    category: NodeCategory;
    organization: ReducedOrganization;
    archived: boolean;
    space: string;
    event: string;
    streamId: string;
    creator: ReducedUser;
    specification: string;
    typescript: string;
    javascript: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
    modifyDate: number;
}

export interface StreamNodeResolvedInputs {
    name: string;
    originalValue: unknown;
    value: unknown;
}

export interface StreamNodeOutput {
    name: string | undefined;
    value: unknown;
}

export interface StreamNodeResultError {
    code: number;
    message: string;
    detail?: string;
    trace: string | undefined;
}

export interface StreamSingleNodeResult {
    uuid: string;
    nodeUuid: string;
    failed: boolean;
    startTimestamp: number;
    endTimestamp: number;
    name: string;
    inputs?: StreamNodeResolvedInputs[];
    outputs?: StreamNodeOutput[];
    error?: StreamNodeResultError;
}
