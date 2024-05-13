import { ReducedEvent } from "..";
import { ReducedSpace } from "../../../../global";
import { ReducedOrganization } from "../../../../idp/organization";
import { ReducedUser } from "../../../../idp/user";
import { StreamNode } from "../../execution";
import { StreamSingleNodeResult } from "./node";

export interface Stream {
    _id: string;
    name: string;
    event: ReducedEvent;
    space: ReducedSpace;
    order: number;
    active: boolean;
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

export interface StreamPatchActive {
    active: boolean;
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
    high5ExecutionId: string;
    nodeResults: StreamSingleNodeResult[];
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
    dry: boolean;
}

export interface EventExecutionRequest {
    payload: StreamExecutionPayload;
    target: string;
    dry: boolean;
}

export interface DesignBuild {
    nodes: StreamNode[];
    startNode: string;
}

export interface StreamExecutionPackage {
    design: DesignBuild;
    payload: StreamExecutionPayload;
    waveEngine: string;
}
