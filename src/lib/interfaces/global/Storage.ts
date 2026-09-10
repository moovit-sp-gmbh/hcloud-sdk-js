import { ReducedOrganization, ReducedUser } from "../idp";

export type Storage = {
    _id: string;
    name: string;
    avatarUrl: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
    isDefault: boolean;
    organization: ReducedOrganization;

    endpoint: string;
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;

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

export type StorageCreateDto = Pick<Storage, "name" | "endpoint" | "bucket" | "region"> & { accessKeyId: string; secretAccessKey: string };
export type StoragePatchDto = Partial<
    Pick<Storage, "name" | "endpoint" | "bucket" | "region"> & { accessKeyId: string; secretAccessKey: string }
>;

export type ReducedStorage = Pick<Storage, "_id" | "name" | "isDefault">;
