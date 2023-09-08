import { ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp";
import { DesignBuild } from "../event/stream";
import { StreamSingleNodeResult } from "../event/stream/node";

export enum High5ExecutionPayloadType {
    JSON = "JSON",
    GENERIC = "GENERIC",
}

export interface High5ExecutionPayload {
    type: High5ExecutionPayloadType;
    data: string;
}

export interface High5ExecutionRequest {
    payload: High5ExecutionPayload;
    target: string;
    dry?: boolean;
}

export interface High5ExecuteAgentResponse {
    failed: boolean;
    message: string;
}

export enum High5ExecutionState {
    QUEUED = "QUEUED",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
}

export enum High5ExecutionOutcome {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    CANCELED = "CANCELED",
}

export interface StreamRunningNode {
    uuid: string;
    name: string;
    progress: number;
    message: string;
}

export interface EventExecutionResult {
    high5ExecutionId: string;
    streamId: string;
    state: High5ExecutionState;
    outcome: High5ExecutionOutcome;
    runningNodes: StreamRunningNode[];
}

export interface High5ExecutionPackage {
    design: DesignBuild;
    payload: High5ExecutionPayload;
    waveEngine: string;
    dry: boolean;
}

export interface High5ExecutionPatchLog {
    streamId: string;
    nodeResults: StreamSingleNodeResult[];
}

export interface High5ExecutionPatchStatus {
    streamId: string;
    state: High5ExecutionState;
    outcome: High5ExecutionOutcome;
    runningNodes: StreamRunningNode[];
    message?: string;
}

export interface High5ExecutionPatch {
    high5ExecutionPatchStatus: High5ExecutionPatchStatus;
    high5ExecutionPatchLog: High5ExecutionPatchLog;
}

export interface High5ExecutionStatus {
    _id: string;
    organizationName: ReducedOrganization;
    spaceName: ReducedSpace;
    streamId: string;
    streamName: string;
    high5ExecutionId: string;
    creatorId: string;
    state: High5ExecutionState;
    outcome: High5ExecutionOutcome;
    message: string;
    runningNodes: StreamRunningNode[];
    target: string;
    dry: boolean;
    createDate: number;
    startDate: number;
    endDate: number;
}

export interface High5ExecutionLog {
    _id: string;
    streamId: string;
    high5ExecutionId: string;
    nodeResults: StreamSingleNodeResult[];
}

export interface High5ExecutionResponse {
    high5ExecutionPatchStatus: High5ExecutionStatus;
    high5ExecutionPatchLog: High5ExecutionLog;
}