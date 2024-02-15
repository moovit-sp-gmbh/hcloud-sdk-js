import { ReducedEvent } from "../../..";
import { ReducedSpace } from "../../../../../../global";
import { ReducedOrganization, ReducedUser } from "../../../../../../idp";
import { DesignContent } from "../StreamDesign";

export default interface DesignSnapshot {
    _id: string;
    name: string;
    content?: DesignContent;
    build?: unknown;
    streamId: string;
    event: ReducedEvent;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    designHash: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
    /**
     * UTC+0 unix timestamp
     */
    modifyDate: number;
}
