export enum CosmoEventName {
    HCLOUD_COSMO_SPACE_RENAME = "hcloud.cosmo.space.rename",
    HCLOUD_COSMO_SPACE_DELETE = "hcloud.cosmo.space.delete",
    HCLOUD_COSMO_SPACE_MEMBER_ADD = "hcloud.cosmo.space.member.add",
    HCLOUD_COSMO_SPACE_MEMBER_REMOVE = "hcloud.cosmo.space.member.remove",
    HCLOUD_COSMO_SPACE_MEMBER_UPDATE = "hcloud.cosmo.space.member.update",

    HCLOUD_COSMO_SPACE_ASSET_ADD = "hcloud.cosmo.space.asset.add",
    HCLOUD_COSMO_SPACE_ASSET_UPLOAD_STARTED = "hcloud.cosmo.space.asset.upload.started",
    HCLOUD_COSMO_SPACE_ASSET_READY = "hcloud.cosmo.space.asset.ready",
    HCLOUD_COSMO_SPACE_ASSET_UPDATE = "hcloud.cosmo.space.asset.update",
    HCLOUD_COSMO_SPACE_ASSET_RENAME = "hcloud.cosmo.space.asset.rename",
    HCLOUD_COSMO_SPACE_ASSET_UPDATE_TAG = "hcloud.cosmo.space.asset.update.tag",
    HCLOUD_COSMO_SPACE_ASSET_REMOVE_TAG = "hcloud.cosmo.space.asset.remove.tag",
    HCLOUD_COSMO_SPACE_ASSET_UPDATE_STATUS = "hcloud.cosmo.space.asset.update.status",
    HCLOUD_COSMO_SPACE_ASSET_UPDATE_METADATA = "hcloud.cosmo.space.asset.update.metadata",
    HCLOUD_COSMO_SPACE_ASSET_TRASHED = "hcloud.cosmo.space.asset.trashed",
    HCLOUD_COSMO_SPACE_ASSET_RECOVERED = "hcloud.cosmo.space.asset.recovered",
    HCLOUD_COSMO_SPACE_ASSET_MOVE = "hcloud.cosmo.space.asset.move",
    HCLOUD_COSMO_SPACE_ASSET_COPY = "hcloud.cosmo.space.asset.copy",
    HCLOUD_COSMO_SPACE_ASSET_DELETE = "hcloud.cosmo.space.asset.delete",

    HCLOUD_COSMO_SPACE_ASSET_COMMENT_ADD = "hcloud.cosmo.space.asset.comment.add",
    HCLOUD_COSMO_SPACE_ASSET_COMMENT_UPDATE = "hcloud.cosmo.space.asset.comment.update",
    HCLOUD_COSMO_SPACE_ASSET_COMMENT_DELETE = "hcloud.cosmo.space.asset.comment.delete",

    HCLOUD_COSMO_SPACE_TAG_ADD = "hcloud.cosmo.space.tag.add",
    HCLOUD_COSMO_SPACE_TAG_UPDATE = "hcloud.cosmo.space.tag.update",
    HCLOUD_COSMO_SPACE_TAG_DELETE = "hcloud.cosmo.space.tag.delete",
}

export interface CosmoEvents {
    Space: {
        "Space rename": CosmoEventName.HCLOUD_COSMO_SPACE_RENAME,
        "Space delete": CosmoEventName.HCLOUD_COSMO_SPACE_DELETE,
        "Space member add": CosmoEventName.HCLOUD_COSMO_SPACE_MEMBER_ADD,
        "Space member remove": CosmoEventName.HCLOUD_COSMO_SPACE_MEMBER_REMOVE,
        "Space member update": CosmoEventName.HCLOUD_COSMO_SPACE_MEMBER_UPDATE,
    },
    Asset: {
        "Asset create": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_ADD,
        "Asset upload started": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_UPLOAD_STARTED,
        "Asset ready": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_READY,
        "Asset rename": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_RENAME,
        "Asset update tag": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_UPDATE_TAG,
        "Asset update status": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_UPDATE_STATUS,
        "Asset trashed": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_TRASHED,
        "Asset recovered": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_RECOVERED,
        "Asset Move": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_MOVE,
        "Asset Copy": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_COPY,
        "Asset Delete": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_DELETE,
        "Asset remove tag": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_REMOVE_TAG,
    },
    Comment: {
        "Comment create": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_COMMENT_ADD,
        "Comment update": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_COMMENT_UPDATE,
        "Comment delete": CosmoEventName.HCLOUD_COSMO_SPACE_ASSET_COMMENT_DELETE,
    },
    Tag: {
        "Tag create": CosmoEventName.HCLOUD_COSMO_SPACE_TAG_ADD,
        "Tag update": CosmoEventName.HCLOUD_COSMO_SPACE_TAG_UPDATE,
        "Tag delete": CosmoEventName.HCLOUD_COSMO_SPACE_TAG_DELETE,
    },
};