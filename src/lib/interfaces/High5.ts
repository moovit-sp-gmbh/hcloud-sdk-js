export enum AppPermission {
    NONE = "NONE",
    READ = "READ",
    EXECUTE = "EXECUTE",
    WRITE = "WRITE",
    MANAGE = "MANAGE",
    OWNER = "OWNER",
}
export interface AppUserPermission {
    userId: string;
    permission: AppPermission;
}

export interface App {
    _id: string;
    name: string;
    organizationId: string;
    creatorId: string;
    permissions: AppUserPermission[];
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

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
    design: any;
    build?: any;
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
    originalValue: any;
    value: any;
}

export interface StreamNodeOutput {
    name: string | undefined;
    value: any;
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
    payload: any;
    failed: boolean;
    dry: boolean; // if node has been processed without execute() method
    nodeResults: StreamSingleNodeResult[];
    startTimestamp: number;
    endTimestamp: number;
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
    nodes: any[];
    startNode: string;
}

export interface StreamExecutionPackage {
    design: DesignBuild;
    payload: StreamExecutionPayload;
}

export interface Webhook {
    _id: string;
    name: string;
    token: string;
    url: string;
    securityHeaders: KeyValuePair<string>[];
    eventId: string;
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
    eventId: string;
    appId: string;
    target: string;
    securityHeaders?: KeyValuePair<string>[];
}

export interface WebhookLog {
    _id: string;
    webhookId: string;
    appId: string;
    organizationId: string;
    eventId: string;
    timestamp: number;
    sourceIp: string;
    completeHeader: any;
    requestBody: any;
    responseStatusCode: number;
    responseBody: string;
}

export interface KeyValuePair<T> {
    [key: string]: T;
}
