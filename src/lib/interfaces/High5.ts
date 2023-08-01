import { Space } from "./Global";
import { ReducedOrganization, ReducedUser } from "./IDP";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface High5Space extends Space {}

export interface Event {
    _id: string;
    name: string;
    space: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

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

export interface Design {
    _id: string;
    name: string;
    design: any;
    build?: any;
    streamId: string;
    event: string;
    space: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

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

export enum WebhookType {
    GENERIC = "GENERIC",
    FRAME_IO = "FRAME_IO",
}

export interface SecurityHeader {
    key: string;
    value: string;
}

export interface Generic {
    eventName: string;
    securityHeaders: SecurityHeader[];
}

export interface FrameIo {
    secret: string;
    eventNames: string[];
}

export interface Webhook {
    _id: string;
    name: string;
    token: string;
    url: string;
    type: WebhookType;
    sub: Generic | FrameIo;
    space: string;
    target: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}

export interface WebhookCreation {
    name: string;
    token: string;
    target: string;
    type: WebhookType;
    sub: Generic | FrameIo;
}

export interface WebhookLog {
    _id: string;
    webhookId: string;
    space: string;
    organization: ReducedOrganization;
    eventId: string;
    timestamp: number;
    sourceIp: string;
    completeHeader: unknown;
    requestBody: unknown;
    responseStatusCode: number;
    responseBody: string;
}

export interface WaveRelease {
    releaseTag: string;
    browserUrl: string;
    latest?: boolean;
}

export interface WaveEngine {
    size: number;
    md5: string;
    content: string;
}

export interface WaveEngineReleaseAsset {
    releaseTag: string;
    browserUrl: string;
    latest?: boolean;
}

export interface KeyValuePair<T> {
    [key: string]: T;
}

export interface Secret {
    key: string;
    createDate: number;
    modifyDate: number;
}
