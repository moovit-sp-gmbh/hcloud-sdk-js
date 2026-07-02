export interface StreamCacheMetadata {
    streamId: string;
    orgName: string;
    spaceName: string;
    eventName: string;
    streamName: string;
    hash: string;
    hits: number;
    createdAt: number;
    remainingTtl: number;
    lastExecution?: number;
}

export interface StreamCacheWipeResult {
    deleted: number;
}
