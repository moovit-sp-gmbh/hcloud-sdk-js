import { ReducedOrganization, ReducedUser } from "../idp";
import { ReducedSpace } from "./Space";

export type Storage = {
    _id: string;
    name: string;
    avatarUrl: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
    isDefault: boolean;
    organization?: ReducedOrganization;

    endpoint: string;
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;

    spaces: (ReducedSpace & { storageUsed: number })[];
    storageUsed: number;

    valid: boolean;
    errorMessage?: string;
};

export type StorageConfiguration = {
    _id: string;
    name: string;
    endpoint: string;
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    isDefault: boolean;
    valid: boolean;
};

export type StorageCapacity = {
    storageId: string;
    organizationId: string;
    /** Whether the license of the organization allows own storages */
    byos: boolean;
    /** Licensed capacity across all own storages of the organization in bytes. Absent for the default storage. */
    capacityBytes?: number;
    /** Current usage across all own storages of the organization in bytes. Absent for the default storage. */
    usedBytes?: number;
    /** Whether an upload of the requested size would exceed the licensed capacity */
    exceeded: boolean;
};

export type StorageDto = Omit<Storage, "accessKeyId" | "secretAccessKey">;

export type StorageCreateDto = Pick<Storage, "name" | "endpoint" | "bucket" | "region"> & { accessKeyId: string; secretAccessKey: string };
export type StoragePatchDto = Partial<Pick<Storage, "name" | "endpoint" | "bucket" | "region"> & { accessKeyId: string; secretAccessKey: string }>;

export type ReducedStorage = Pick<Storage, "_id" | "name" | "isDefault">;
