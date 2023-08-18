import { ReducedOrganization } from "../../../../idp/organization/Organization";
import { ReducedUser } from "../../../../idp/user/User";
import { StreamSingleNodeResult } from "./node/Node";

export interface Stream {
    _id: string;
    name: string;
    event: string;
    space: string;
    order: number;
    organization: ReducedOrganization;
    creator: ReducedUser;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

export enum MoveDirection {
    UP = "UP",
    DOWN = "DOWN",
}

export interface SingleStreamPatchOrder {
    direction: MoveDirection;
}

export interface StreamPatchOrder {
    streamId: string;
    order: number;
}

export interface StreamResult {
    host: string;
    failed: boolean;
    nodeResults: StreamSingleNodeResult[];
    endTimestamp: number;
}

export interface StreamExecutionNatsResponse {
    failed: boolean;
    message: string;
}

export interface StreamLog {
    _id: string;
    streamId: string;
    payload: string;
    nodeResults: StreamSingleNodeResult[];
    dry: boolean;
    startTimestamp: number;
    endTimestamp: number;
}

export enum StreamPayloadType {
    JSON = "JSON",
    GENERIC = "GENERIC",
}

export interface StreamExecutionPayload {
    type: StreamPayloadType;
    data: string;
}

export interface StreamExecutionRequest {
    payload: StreamExecutionPayload;
    target: string;
}

export interface EventExecutionRequest {
    payload: StreamExecutionPayload;
    target: string;
    dry: boolean;
}

export interface DesignBuild {
    nodes: unknown[];
    startNode: string;
}

export interface StreamExecutionPackage {
    design: DesignBuild;
    payload: StreamExecutionPayload;
    waveEngine: string;
}
