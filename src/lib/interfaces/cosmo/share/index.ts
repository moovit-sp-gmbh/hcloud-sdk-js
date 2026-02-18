import { ReducedUser } from "../../idp"

export interface Share {
    _id: string;
    name: string;
    creator: ReducedUser;
    createDate: number;
    items: string[];
    permissions?: string[];
    permissionGroups?: ShareAssetPermissionGroup[];
    namespaces?: Record<string, string[]>;
    namespaceGroups?: Record<string, ShareNamespacePermissionGroup[]>;
    expires?: number;
    password?: string;
}

export interface ShareCreate extends Omit<Share, "_id" | "createDate" | "creator"> {
    password?: string;
    expires?: number;
    namespaces?: Record<string, string[]>;
    /**
     * Array of emails
     */
    users?: string[];
}

export type ShareWithUsers = Share & {
    users: ReducedUser[];
};

export type SharePatch = Partial<
    Pick<ShareCreate, "name" | "expires" | "password"> & {
        items: string[];
        permissions?: string[];
        assetPermissionGroups?: ShareAssetPermissionGroup[];
        namespaces?: Record<string, string[] | null>;
        namespaceGroups?: Record<string, ShareNamespacePermissionGroup[] | null>;
    }
>;

export enum ShareAssetPermissionGroup {
    VIEW_ASSETS_ONLY = "VIEW_ASSETS_ONLY",
    BASE = "BASE",
    ENABLE_DOWNLOAD = "ENABLE_DOWNLOAD",
    ENABLE_CONTRIBUTION = "ENABLE_CONTRIBUTION",
    ENABLE_ACTIVITY = "ENABLE_ACTIVITY",
    ENABLE_DELETION = "ENABLE_DELETION",
}

export enum ShareNamespacePermissionGroup {
    ENABLE_COMMENTS = "ENABLE_COMMENTS",
    ENABLE_COMMENT_DELETION = "ENABLE_COMMENT_DELETION",
    ENABLE_APPROVAL = "ENABLE_APPROVAL",
    ENABLE_APPROVAL_OVERWRITE = "ENABLE_APPROVAL_OVERWRITE",
    ENABLE_METADATA_EDITING = "ENABLE_METADATA_EDITING",
    ENABLE_TAGS = "ENABLE_TAGS",
    VIEW_ASSET_METADATA = "VIEW_ASSET_METADATA",
}
