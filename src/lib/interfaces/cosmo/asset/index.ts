import { ReducedSpace } from "../../global";
import { SearchFilterComparatorString, SearchFilterType } from "../../global/SearchFilters";
import { ReducedTeam } from "../../idp";
import { ReducedOrganization } from "../../idp/organization";
import { ReducedUser } from "../../idp/user";
import { CosmoSpace } from "../space";
import { Tag } from "../tag/tag";

export interface BaseAsset {
    _id: string;
    name: string;
    type: ItemType;
    createDate: number;
    modifyDate: number;
    creator: ReducedUser;
    organization: ReducedOrganization;
    space: ReducedSpace;
    permissions?: string[];
    breadcrumb?: (Asset | CosmoSpace)[];
    purgeAt?: number;
    deletedAt?: number;
}

export type Asset = BaseAsset & (MediaAsset | Stack | Production | Folder | AssetReference);

export type MediaAsset = {
    type: ItemType.MEDIA_ASSET;
    extension: string;
    assetType: AssetType;
    path: string;
    status: UploadStatus;
    progress: number;
    tag?: Tag;
    previewUrl?: string;
    tilePreviewVttUrl?: string;
    duration?: number;
    frameRate?: number;
    media?: Media[];
    thumbnailUrl?: string;
    posterUrl?: string;
    namespaces?: Record<string, { status: string; statusAuthor?: ReducedUser; canWriteStatus?: boolean; tag?: Tag; metadata?: NamespaceMetadata }>;
    queuePosition?: number;
    queueTotal?: number;
    stack: { version: number; stack: { _id: string; name: string; creator: ReducedUser; thumbnail?: { url: string } } };
};

export type Production = {
    type: ItemType.PRODUCTION;
};

export type Folder = {
    type: ItemType.FOLDER;
    children?: Asset[];
};

export type AssetReference = {
    type: ItemType.REFERENCE;
    reference: { status: string };
};

export type Stack = Omit<MediaAsset, "type" | "stack"> & {
    type: ItemType.STACK;
    stack: { version: number; asset: { _id: string; name: string; creator: ReducedUser; thumbnail?: { url: string } } }[];
};

export enum AssetType {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE",
    DOCUMENT = "DOCUMENT",
    UNKNOWN = "UNKNOWN",
    FOLDER = "FOLDER",
}

// These must correlate with the Neo4j labels!
export enum ItemType {
    ASSET = "ASSET",
    MEDIA_ASSET = "MEDIA_ASSET",
    REFERENCE = "REFERENCE",
    SPACE = "SPACE",
    PRODUCTION = "PRODUCTION",
    PROJECT = "PROJECT",
    FOLDER = "FOLDER",
    COMMENT = "COMMENT",
    TAG = "TAG",
    STACK = "STACK",
}

export enum UploadStatus {
    WAITING = "WAITING",
    UPLOADING = "UPLOADING",
    UPLOADED = "UPLOADED",
    PROCESSING = "PROCESSING",
    FINISHED = "FINISHED",
    FAILED = "FAILED",
    POST_PROCESSING = "POST_PROCESSING",
}

export type NamespaceRushStatus = "approved" | "rejected" | "none";

export interface Upload {
    url: string;
    token: string;
    expiration: number;
    libraryId?: string;
    videoId?: string;
}

export enum AssetPermission {
    CONTRIBUTE = "CONTRIBUTE",
    DOWNLOAD = "DOWNLOAD",
    DELETE = "DELETE",
    READ_DETAILS = "READ_DETAILS",
}

type BaseMedia = {
    url?: string;
};

export type Mentionable = (ReducedUser & { type: "user" }) | (ReducedTeam & { type: "team" });

export type Media =
    | (BaseMedia & { type: MediaType.VIDEO; name: "original" | string; fileSize: number; metadata: (VideoMetadata | AudioMetadata)[] })
    | (BaseMedia & { type: MediaType.AUDIO; name: string; metadata: AudioMetadata[] })
    | (BaseMedia & { type: MediaType.IMAGE; name: string })
    | (BaseMedia & { type: MediaType.VTT; name: string })
    | (BaseMedia & { type: MediaType.UNKNOWN; name: string });

export enum MediaType {
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    IMAGE = "IMAGE",
    UNKNOWN = "UNKNOWN",
    VTT = "VTT",
}

export enum MetadataType {
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    UNKNOWN = "UNKNOWN",
}

export interface VideoMetadata {
    type: MetadataType.VIDEO;
    codec: string;
    frameRate: number;
    pixelFormat: string;
    aspectRatio: string;
    colorSpace: string;
    width: number;
    height: number;
    fieldOrder: string;
    duration: number;
    tcIn: number;
    tcOut: number;
    noOfFrames: number;
    formatLongName: string;
}

export interface AudioMetadata {
    type: MetadataType.AUDIO;
    codec: string;
    channels: number;
    channelLayout: string;
    bitRate: number;
    sampleRate: number;
}

export interface CreateAsset {
    name: string;
    parentId?: string;
    tags?: string[];
    categories?: string[];
}

export interface PatchAsset {
    tags?: string[];
    categories?: string[];
}

export enum Resolution {
    ORIGINAL = "original",
    R1080 = "1080",
    R720 = "720",
    R480 = "480",
}

export const supportedFormats = [".mp4", ".mov", ".mkv", ".mxf"];

export const searchParams = {
    type: {
        type: [SearchFilterType.STRING, SearchFilterType.SELECT, SearchFilterType.TYPEAHEAD],
        comparators: [SearchFilterComparatorString.IS, SearchFilterComparatorString.IS_NOT],
    },
    _id: {
        type: [SearchFilterType.STRING],
        comparators: [SearchFilterComparatorString.IS, SearchFilterComparatorString.IS_NOT],
    },
    name: {
        type: [SearchFilterType.STRING, SearchFilterType.SELECT, SearchFilterType.TYPEAHEAD],
        comparators: [SearchFilterComparatorString.IS, SearchFilterComparatorString.IS_NOT, SearchFilterComparatorString.CONTAINS],
    },
} as const;

export interface AssetFilter {
    key: keyof typeof searchParams;
    type: (typeof searchParams)[this["key"]]["type"][number];
    value: string;
    comparator: (typeof searchParams)[this["key"]]["comparators"][number];
}

export enum AssetSearchContext {
    ORGANIZATION = "ORGANIZATION",
    TRASH = "TRASH",
    SHARE = "SHARE",
}

export enum SubscriptionFilter {
    STATUS = "status",
    TAGS = "tags",
    COMMENTS = "comments",
}

export type NamespaceMetadata = Record<string, string | number | boolean | (string | number | boolean)[]>;

export type VTTThumbnail = {
    start: number;
    end: number;
    url: string;
    xywh?: { x: number; y: number; w: number; h: number };
};

export type AudioWaveformItem = {
    assetId: string;
    channels: number[][];
};
