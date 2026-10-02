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
    /** Total bytes used across all spaces assigned to this storage. For the default storage only the spaces of the requesting organization. */
    storageUsed: number;
    /**
     * Licensed maximum capacity in GB (1 GB = 1024³ bytes). For the default storage the default storage quota of the organization.
     * For own storages the storages quota of the organization, shared across all of its own storages (0 if own storages are not allowed).
     */
    capacityInGB: number;

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
    /** Organization the capacity was determined for. For own storages the owner, for the default storage the requested organization. */
    organizationId: string;
    /** Whether the storage is the default storage */
    isDefault: boolean;
    /** Whether the license of the organization allows own storages */
    byos: boolean;
    /** Licensed capacity in bytes. For own storages across all own storages of the organization, for the default storage the default storage quota of the organization. */
    capacityBytes?: number;
    /** Current usage in bytes. For own storages across all own storages of the organization, for the default storage by the spaces of the organization. */
    usedBytes?: number;
    /** Whether an upload of the requested size would exceed the licensed capacity */
    exceeded: boolean;
};

export type StorageDto = Omit<Storage, "accessKeyId" | "secretAccessKey">;

export type StorageCreateDto = Pick<Storage, "name" | "endpoint" | "bucket" | "region"> & { accessKeyId: string; secretAccessKey: string };
export type StoragePatchDto = Partial<Pick<Storage, "name" | "endpoint" | "bucket" | "region"> & { accessKeyId: string; secretAccessKey: string }>;

export type ReducedStorage = Pick<Storage, "_id" | "name" | "isDefault">;
