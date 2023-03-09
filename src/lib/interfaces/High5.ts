import { App } from "./Global";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface High5App extends App {}

export interface Event {
    _id: string;
    name: string;
    appId: string;
    organizationId: string;
    creatorId: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

export interface Stream {
    _id: string;
    name: string;
    eventId: string;
    appId: string;
    order: number;
    organizationId: string;
    creatorId: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

export interface StreamPatchOrder {
    streamId: string;
    order: number;
}

export interface Design {
    _id: string;
    name: string;
    design: unknown;
    build?: unknown;
    streamId: string;
    eventId: string;
    appId: string;
    organizationId: string;
    creatorId: string;
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
    organizationId: string;
    archived: boolean;
    appId: string;
    eventId: string;
    streamId: string;
    userId: string;
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
    stream: Stream;
    uuid: string;
    host: string;
    payload: unknown;
    failed: boolean;
    dry: boolean; // if node has been processed without execute() method
    nodeResults: StreamSingleNodeResult[];
    startTimestamp: number;
    endTimestamp: number;
}

export interface StreamExecutionNatsResponse {
    failed: boolean;
    message: string;
    stream?: Stream;
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
    waitForResult: boolean;
    timeout: number;
}

export interface EventExecutionRequest {
    eventName: string;
    payload: StreamExecutionPayload;
    target: string;
    waitForResult: boolean;
    timeout: number;
}

export interface DesignBuild {
    nodes: unknown[];
    startNode: string;
}

export interface StreamExecutionPackage {
    design: DesignBuild;
    payload: StreamExecutionPayload;
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
    appId: string;
    target: string;
    organizationId: string;
    creatorId: string;
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
    appId: string;
    organizationId: string;
    eventId: string;
    timestamp: number;
    sourceIp: string;
    completeHeader: unknown;
    requestBody: unknown;
    responseStatusCode: number;
    responseBody: string;
}

export interface KeyValuePair<T> {
    [key: string]: T;
}
