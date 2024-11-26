import { HCloud } from "../../../../Hcloud";
import { ReducedSpace } from "../../../global";
import { ReducedOrganization, ReducedUser } from "../../../idp";
import { WaveCatalog, WaveEngine } from "../../wave";
import { ReducedEvent } from "../event";
import { DesignBuild } from "../event/stream";
import { StreamNodeAdditionalConnector, StreamNodeOutput, StreamNodeResolvedInputs, StreamSingleNodeResult } from "../event/stream/node";

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
    waveCatalogs: WaveCatalog[];
    waveEngine: WaveEngine;
    dry: boolean;
    info: StreamInfo;
    debug: boolean;
}

type StreamInfo = {
    target: string;
    webhook?: WebhookInfo;
};

type WebhookInfo = {
    callbackUrl: string;
};

export interface ExtendedHigh5ExecutionPackage extends High5ExecutionPackage {
    hcl: HCloud;
    orgName: string;
    spaceName: string;
    streamId: string;
    secret: string;
}

export interface High5ExecutionPatchLog {
    streamId: string;
    nodeResults: StreamSingleNodeResult[];
}

export interface StreamRunningNodePatch {
    uuid: string;
    name: string;
    progress: number;
    message: string;
}

export interface High5ExecutionPatchStatus {
    streamId: string;
    state?: High5ExecutionState;
    outcome?: High5ExecutionOutcome;
    runningNodes?: StreamRunningNodePatch[];
    message?: string;
    startDate: number;
    endDate?: number;
}

export interface High5ExecutionPatch {
    high5ExecutionPatchStatus: High5ExecutionPatchStatus;
    high5ExecutionPatchLog: High5ExecutionPatchLog;
}

export interface High5ExecutionStatus {
    _id: string;
    organization: ReducedOrganization;
    space: ReducedSpace;
    event: ReducedEvent;
    streamId: string;
    streamName: string;
    high5ExecutionId: string;
    creator: ReducedUser;
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
    payload?: High5ExecutionPayload;
    high5ExecutionId: string;
    nodeResults: StreamSingleNodeResult[];
    createDate: number;
}

export interface High5ExecutionResponse {
    high5ExecutionId: string;
    statusId: string;
    logId: string;
}

export interface StreamNode {
    uuid: string;
    name: string;
    catalog: WaveCatalog;
    path: string;
    bypass?: boolean;
    onSuccess?: string;
    onFail?: string;
    inputs?: StreamNodeResolvedInputs[];
    outputs?: StreamNodeOutput[];
    additionalConnectors?: StreamNodeAdditionalConnector[];
    breakpoint?: boolean;
}

export interface High5ExecuteOnAgentRequest {
    organizationName: string;
    spaceName: string;
    streamId: string;
    secret: string;
    subject: string;
}

export interface High5ExecutionCancelRequest {
    secret: string;
}
