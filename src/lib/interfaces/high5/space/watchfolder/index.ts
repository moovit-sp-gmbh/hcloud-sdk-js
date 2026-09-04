import { ReducedSpace } from "../../../global";
import { ReducedOrganization, ReducedUser } from "../../../idp";

export enum WatchFolderResourceType {
    S3 = "S3",
    LOCAL = "LOCAL",
}

interface S3WatchFolderCredentials {
    resourceType: WatchFolderResourceType.S3;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    endpoint?: string;
    bucket: string;
}

interface LocalWatchFolderCredentials {
    resourceType: WatchFolderResourceType.LOCAL;
}

export type WatchFolderCredentials = S3WatchFolderCredentials | LocalWatchFolderCredentials;

export interface WatchFolder {
    _id: string;
    name: string;
    target: string;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    createDate: number;
    resourceType: WatchFolderResourceType;
    path: string;
    interval: number;
    eventName: string;
    credentials: WatchFolderCredentials;
    maxFileResetAttempts: number; // Maximum number of times a single file may be reset back to STABLE by a stream execution before further reset requests are rejected
}

export interface CreateWatchFolder {
    name: string;
    target: string;
    resourceType: WatchFolderResourceType;
    path: string;
    interval: number;
    eventName: string;
    credentials: WatchFolderCredentials;
    maxFileResetAttempts?: number;
}

export interface PatchWatchFolder {
    name?: string;
    target?: string;
    resourceType?: WatchFolderResourceType;
    path?: string;
    interval?: number;
    eventName?: string;
    credentials?: WatchFolderCredentials;
    maxFileResetAttempts?: number;
}

export enum WatchFolderFileStatus {
    NEW = "NEW",
    GROWING = "GROWING",
    STABLE = "STABLE",
    PROCESSING = "PROCESSING",
    PROCESSED = "PROCESSED",
    MISSING = "MISSING",
}

export interface WatchFolderFile {
    _id: string;
    watchFolderId: string;
    spaceId: string;
    organizationId: string;
    path: string;
    size: number;
    status: WatchFolderFileStatus;
    lastSeen: number;
    createDate: number;
    lastResetReason?: string; // Reason given by the stream execution that last reset this file instead of letting it complete
    lastResetAt?: number; // Unix timestamp of the last reset requested by a stream execution
    resetCount?: number; // Number of times this file has been reset back to STABLE by a stream execution
}

export interface WatchFolderFileReset {
    reason?: string; // Why the currently executing stream considers this watch folder file not actually complete yet
}

export interface WatchFolderScanReport {
    files: { path: string; size: number }[];
}

export interface WatchFolderScanConfig {
    path: string;
    credentials: WatchFolderCredentials;
}
