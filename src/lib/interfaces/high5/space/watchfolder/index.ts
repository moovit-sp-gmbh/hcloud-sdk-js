import { ReducedSpace } from "../../../global";
import { ReducedOrganization, ReducedUser } from "../../../idp";

export enum WatchFolderResourceType {
    S3 = "S3",
    SMB = "SMB",
}

interface S3WatchFolderCredentials {
    resourceType: WatchFolderResourceType.S3;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    endpoint?: string;
    bucket: string;
}

interface SmbWatchFolderCredentials {
    resourceType: WatchFolderResourceType.SMB;
}

export type WatchFolderCredentials = S3WatchFolderCredentials | SmbWatchFolderCredentials;

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
}

export interface CreateWatchFolder {
    name: string;
    target: string;
    resourceType: WatchFolderResourceType;
    path: string;
    interval: number;
    eventName: string;
    credentials: WatchFolderCredentials;
}

export interface PatchWatchFolder {
    name?: string;
    target?: string;
    resourceType?: WatchFolderResourceType;
    path?: string;
    interval?: number;
    eventName?: string;
    credentials?: WatchFolderCredentials;
}

export enum WatchFolderFileStatus {
    NEW = "new",
    GROWING = "growing",
    STABLE = "stable",
    PROCESSING = "processing",
    PROCESSED = "processed",
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
}

export interface WatchFolderScanReport {
    files: { path: string; size: number }[];
}
