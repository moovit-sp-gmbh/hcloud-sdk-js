import { ReducedUser } from "../idp";
import { BaseAsset } from "./asset";

export enum Permissions {
    VIEW_SPACE = "VIEW_SPACE",
    VIEW_MEMBERS = "VIEW_MEMBERS",
    UPDATE_MEMBERS = "UPDATE_MEMBERS",
    VIEW_TRASHBIN = "VIEW_TRASHBIN",
    RECOVER_TRASHBIN = "RECOVER_TRASHBIN",
    EMPTY_TRASHBIN = "EMPTY_TRASHBIN",
    VIEW_ROLES = "VIEW_ROLES",
    CREATE_ROLES = "CREATE_ROLES",
    EDIT_ROLES = "EDIT_ROLES",
    DELETE_ROLES = "DELETE_ROLES",
    ASSIGN_USER_ROLES = "ASSIGN_USER_ROLES",
    UPDATE_SPACE_AVATAR = "UPDATE_SPACE_AVATAR",
    UPDATE_SPACE_NAME = "UPDATE_SPACE_NAME",
    DELETE_SPACE = "DELETE_SPACE",
    CONNECT_HIGH5_SPACE = "CONNECT_HIGH5_SPACE",
    VIEW_ASSETS = "VIEW_ASSETS",
    VIEW_ASSET_DETAILS = "VIEW_ASSET_DETAILS",
    VIEW_ASSET_ACTIVITY = "VIEW_ASSET_ACTIVITY",
    DOWNLOAD_ASSETS = "DOWNLOAD_ASSETS",
    CREATE_ASSETS = "CREATE_ASSETS",
    UPDATE_ASSETS = "UPDATE_ASSETS",
    DELETE_ASSETS = "DELETE_ASSETS",
    COPY_ASSETS = "COPY_ASSETS",
    MOVE_ASSETS = "MOVE_ASSETS",
    RENAME_ASSETS = "RENAME_ASSETS",
    SHARE_ASSETS = "SHARE_ASSETS",
    VIEW_NAMESPACES = "VIEW_NAMESPACES",
    EDIT_NAMESPACES = "EDIT_NAMESPACES",
    CREATE_NAMESPACES = "CREATE_NAMESPACES",
    DELETE_NAMESPACES = "DELETE_NAMESPACES",
    VIEW_ASSET_TAGS = "VIEW_ASSET_TAGS",
    WRITE_ASSET_TAGS = "WRITE_ASSET_TAGS",
    VIEW_ASSET_STATUS = "VIEW_ASSET_STATUS",
    WRITE_ASSET_STATUS = "WRITE_ASSET_STATUS",
    VIEW_ASSET_COMMENTS = "VIEW_ASSET_COMMENTS",
    CREATE_ASSET_COMMENTS = "CREATE_ASSET_COMMENTS",
    EDIT_ASSET_COMMENTS = "EDIT_ASSET_COMMENTS",
    DELETE_ASSET_COMMENTS = "DELETE_ASSET_COMMENTS",
    VIEW_MENTIONS = "VIEW_MENTIONS",
    VIEW_SHARES = "VIEW_SHARES",
    EDIT_SHARES = "EDIT_SHARES",
    DELETE_SHARES = "DELETE_SHARES",
    ADD_USERS_TO_SHARES = "ADD_USERS_TO_SHARES",
    REMOVE_USERS_FROM_SHARES = "REMOVE_USERS_FROM_SHARES",
}

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
