import { DesignBuild } from "../..";
import { ReducedEvent } from "../../..";
import { ReducedSpace } from "../../../../../../global";
import { ReducedOrganization, ReducedUser } from "../../../../../../idp";
import { DesignContent } from "../StreamDesign";

export default interface DesignSnapshot {
    _id: string;
    name: string;
    content?: DesignContent;
    build?: DesignBuild;
    streamId: string;
    event: ReducedEvent;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    designHash: string;
    type: SnapshotType;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
    /**
     * UTC+0 unix timestamp
     */
    modifyDate: number;
}

export enum SnapshotType {
    MANUAL = "manual",
    PUBLISHED = "published",
}
