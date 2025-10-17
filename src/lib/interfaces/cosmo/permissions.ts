import { ReducedUser } from "../idp";
import { BaseAsset } from "./asset";

export type Permission = {
    name: string;
    description: string;
    category: PermissionCategory;
};

export enum PermissionCategory {
    ASSET = "asset",
    NAMESPACE = "namespace",
    SPACE = "space",
    SHARE = "share",
    USER = "user",
}

export type AssetPermission = Omit<Permission, "category"> & { category: PermissionCategory.ASSET };
export type NamespacePermission = Omit<Permission, "category"> & { category: PermissionCategory.NAMESPACE };
export type SpacePermission = Omit<Permission, "category"> & { category: PermissionCategory.SPACE };
export type SharePermission = Omit<Permission, "category"> & { category: PermissionCategory.SHARE };
export type UserPermission = Omit<Permission, "category"> & { category: PermissionCategory.USER };

export type PermissionDiscovery = {
    [PermissionCategory.ASSET]: AssetPermission;
    [PermissionCategory.NAMESPACE]: NamespacePermission;
    [PermissionCategory.SPACE]: SpacePermission;
    [PermissionCategory.SHARE]: SharePermission;
    [PermissionCategory.USER]: UserPermission;
};

export type Role = {
    _id: string;
    name: string;
    createDate: number;
    modifyDate: number;
    creator: ReducedUser;
};

export type DetailedRole = Role & {
    users: ReducedUser[];
    permissions: Record<
        string,
        {
            entity: Pick<BaseAsset, "_id" | "type" | "name">;
            permissions: string[];
        }
    >;
};
