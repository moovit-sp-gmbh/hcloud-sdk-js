import { SearchFilterComparatorString, SearchFilterType } from "../../global/SearchFilters"
import { ReducedUser } from "../../idp"
import { Reference } from "../namespace"

export type Item = {
    _id: string;
    name: string;
    creator: ReducedUser;
    type: ItemType;
    breadcrumb?: Item[];
    createDate: number;
    deletedAt: number;
};

export enum ItemType {
    ASSET = "ASSET",
    SPACE = "SPACE",
    PRODUCTION = "PRODUCTION",
    PROJECT = "PROJECT",
    FOLDER = "FOLDER",
}

export type NamespaceRushStatus = "approved" | "rejected" | "none";

export interface Asset extends Item {
    assetType: AssetType;
    path: string;
    status: string;
    type: ItemType.ASSET;
    tags?: string[];
    uploadStatus: number;
    categories?: string[];
    thumbnailUrl?: string;
    previewUrl?: string;
    duration?: number;
    frameRate?: number;
    media?: Media[];
    upload?: Upload;
    permissions?: string[];
    namespaces?: {
        rush?: { status?: NamespaceRushStatus };
    };
}

export interface Upload {
    url: string;
    token: string;
    expiration: number;
    libraryId?: string;
    videoId?: string;
}

export enum AssetType {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE",
    DOCUMENT = "DOCUMENT",
    UNKNOWN = "UNKNOWN",
}

export interface AssetReference extends Asset, Reference {
    reference: { status: string };
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

export type Media =
    | (BaseMedia & { type: MediaType.VIDEO; name: "original" | string; metadata: VideoMetadata | AudioMetadata[] })
    | (BaseMedia & { type: MediaType.AUDIO; name: string; metadata: AudioMetadata[] })
    | (BaseMedia & { type: MediaType.IMAGE; name: string })
    | (BaseMedia & { type: MediaType.UNKNOWN; name: string });

export enum MediaType {
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    IMAGE = "IMAGE",
    UNKNOWN = "UNKNOWN",
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
    fileSize: number;
    width: number;
    height: number;
    fieldOrder: string;
    duration: number;
    tcIn: string;
    tcOut: string;
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
