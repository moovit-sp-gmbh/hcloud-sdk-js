import { ReducedUser, ShareReducedUnlinkedUser, User } from "../../idp";

/**
 * Represents a public link for sharing.
 * @property link - The URL of the public link.
 * @property visitsLimit - (Optional) The maximum number of allowed visits for the link.
 */
export interface PublicLink {
    link: string;
    visitsLimit?: number;
}
/**
 * Represents a share entity containing shared items and permissions.
 * @property _id - Unique identifier for the share.
 * @property name - Name of the share.
 * @property creator - The user who created the share.
 * @property createDate - Timestamp of when the share was created (in milliseconds since epoch).
 * @property items - Array of item IDs included in the share.
 * @property permissions - (Optional) Array of permission strings for the share.
 * @property permissionGroups - (Optional) Array of asset permission groups applied to the share.
 * @property namespaces - (Optional) Mapping of namespace names to arrays of item IDs.
 * @property namespaceGroups - (Optional) Mapping of namespace names to arrays of namespace permission groups.
 * @property expires - (Optional) Expiration timestamp for the share (in milliseconds since epoch).
 * @property password - (Optional) Password required to access the share.
 * @property publicLink - (Optional) Public link information for the share.
 */
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
    publicLink?: PublicLink;
    users?: (User | ReducedUser | ShareReducedUnlinkedUser)[];
    waiting: boolean;
}

/**
 * Represents the payload for creating a new share.
 * Omits _id, createDate, and creator from Share.
 * @property password - (Optional) Password for the share.
 * @property expires - (Optional) Expiration timestamp for the share (in milliseconds since epoch).
 * @property namespaces - (Optional) Mapping of namespace names to arrays of item IDs.
 * @property users - (Optional) Array of user emails to share with.
 * @property public - (Optional) Whether the share is public.
 * @property visitsLimit - (Optional) Maximum number of allowed visits for the share (only applicable for public shares).
 */
export interface ShareCreate extends Omit<Share, "_id" | "createDate" | "creator" | "permissionGroups" | "users"> {
    password?: string;
    expires?: number;
    namespaces?: Record<string, string[]>;
    assetPermissionGroups?: ShareAssetPermissionGroup[];
    /**
     * Array of emails
     */
    users?: string[];
    public?: boolean;
    visitsLimit?: number;
    deferred?: boolean;
}

export type ShareWithUsers = Share & {
    users: ((ReducedUser | Pick<ReducedUser, "email">) & { linkedToShare: boolean })[];
};

/**
 * Represents a patch (partial update) for a share.
 * @property name - (Optional) New name for the share.
 * @property expires - (Optional) New expiration timestamp.
 * @property password - (Optional) New password for the share.
 * @property items - (Optional) New array of item IDs.
 * @property permissions - (Optional) New array of permission strings.
 * @property assetPermissionGroups - (Optional) New array of asset permission groups.
 * @property namespaces - (Optional) New mapping of namespace names to arrays of item IDs or null.
 * @property namespaceGroups - (Optional) New mapping of namespace names to arrays of namespace permission groups or null.
 * @property public - (Optional) Whether the share is public.
 * @property visitsLimit - (Optional) New maximum number of allowed visits (only applicable for public shares).
 */
export type SharePatch = Partial<
    Pick<ShareCreate, "name" | "expires" | "password" | "users"> & {
        items: string[];
        permissions?: string[];
        assetPermissionGroups?: ShareAssetPermissionGroup[];
        namespaces?: Record<string, string[] | null>;
        namespaceGroups?: Record<string, ShareNamespacePermissionGroup[] | null>;
        public?: boolean;
        visitsLimit?: number;
        users?: string[];
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
    BASE = "BASE",
    ENABLE_COMMENTS = "ENABLE_COMMENTS",
    ENABLE_COMMENT_DELETION = "ENABLE_COMMENT_DELETION",
    ENABLE_APPROVAL = "ENABLE_APPROVAL",
    ENABLE_APPROVAL_OVERWRITE = "ENABLE_APPROVAL_OVERWRITE",
    ENABLE_METADATA_EDITING = "ENABLE_METADATA_EDITING",
    ENABLE_TAGS = "ENABLE_TAGS",
    VIEW_ASSET_METADATA = "VIEW_ASSET_METADATA",
}
