export enum CosmoEventName {
    HCLOUD_COSMO_SPACE_ADD = "hcloud.cosmo.space.add",
    HCLOUD_COSMO_SPACE_RENAME = "hcloud.cosmo.space.rename",
    HCLOUD_COSMO_SPACE_UPDATE = "hcloud.cosmo.space.update",
    HCLOUD_COSMO_SPACE_DELETE = "hcloud.cosmo.space.delete",

    HCLOUD_COSMO_SPACE_ASSET_ADD = "hcloud.cosmo.space.asset.add",
    HCLOUD_COSMO_SPACE_ASSET_UPDATE = "hcloud.cosmo.space.asset.update",
    HCLOUD_COSMO_SPACE_ASSET_MOVE = "hcloud.cosmo.space.asset.move",
    HCLOUD_COSMO_SPACE_ASSET_DELETE = "hcloud.cosmo.space.asset.delete",

    HCLOUD_COSMO_SPACE_ASSET_COMMENT_ADD = "hcloud.cosmo.space.asset.comment.add",
    HCLOUD_COSMO_SPACE_ASSET_COMMENT_UPDATE = "hcloud.cosmo.space.asset.comment.update",
    HCLOUD_COSMO_SPACE_ASSET_COMMENT_DELETE = "hcloud.cosmo.space.asset.comment.delete",
}

export interface CosmoEvents {
    Space: {
        "Space rename": CosmoEventName.HCLOUD_COSMO_SPACE_RENAME;
        "Space update": CosmoEventName.HCLOUD_COSMO_SPACE_UPDATE;
        "Space delete": CosmoEventName.HCLOUD_COSMO_SPACE_DELETE;
    };
    Asset: {
        "Asset create": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_ADD;
        "Asset update": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_UPDATE;
        "Asset Move": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_MOVE;
        "Asset Delete": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_DELETE;
    };
    Comment: {
        "Comment create": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_COMMENT_ADD;
        "Comment update": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_COMMENT_UPDATE;
        "Comment delete": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_COMMENT_DELETE;
    };
}
