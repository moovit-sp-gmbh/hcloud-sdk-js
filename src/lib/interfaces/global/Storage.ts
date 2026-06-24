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
    signedUrl?: string;
    testBucketName?: string;
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

export type StorageCreateDto = Pick<Storage, "name" | "endpoint" | "bucket" | "region" | "accessKeyId" | "secretAccessKey">;
export type StoragePatchDto = Partial<
    Pick<Storage, "name" | "endpoint" | "bucket" | "region" | "accessKeyId" | "secretAccessKey" | "avatarUrl" | "valid" | "errorMessage"> & {
        testBucketName?: string;
    }
>;
export type StorageDto = Storage & {
    signedUrl?: string;
    testBucketName?: string;
};

export type ReducedStorage = Pick<Storage, "_id" | "name" | "isDefault">;
