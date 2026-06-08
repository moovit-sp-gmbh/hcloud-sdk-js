import { ReducedTeam, ReducedUser } from "../../idp";
import { ItemType } from "../asset";

export interface CosmoSpace {
    _id: string;
    name: string;
    createDate: number;
    avatarUrl: string;
    creator: ReducedUser;
    type: ItemType.SPACE;
    trashAutoDelete: boolean;
    trashAutoDeleteTTL: number | null;
    high5_spaceName?: string;
    high5_executionTarget?: string;
    permissions?: string[];
    storageUsed: number;
    storage: ReducedStorage;
}

export interface High5SpaceInfo {
    high5_spaceName: string;
    executionTarget: string;
}

export type SpaceUser = (ReducedUser | ReducedTeam) & { roles: { name: string; _id: string }[]; type: "user" | "team" };

export interface TrashPolicy {
    enabled: boolean;
    ttlDays?: number;
}

export enum StorageType {
    S3 = "S3",
    TAMS = "TAMS",
}

export type ReducedStorage = {
    name: string;
    type: StorageType;
    bucket: string;
    valid: boolean;
    error?: string;
    default: boolean;
};

export type Storage = ReducedStorage & {
    region: string;
    endpoint: string;
    accessKeyId: string;
    secretAccessKey: string;
};

export type SpacePatchStorageDto = {
    name: string;
    endpoint: string;
    bucket: string;
    region: string;
    type: StorageType;
    accessKeyId: string;
    secretAccessKey: string;
};

export type SpacePatchStorageValidationDto = {
    valid: boolean;
    error: string;
};
