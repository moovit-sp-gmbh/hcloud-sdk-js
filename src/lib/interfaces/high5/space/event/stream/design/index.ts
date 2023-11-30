import { ReducedEvent } from "../..";
import { ReducedSpace } from "../../../../../global";
import { ReducedOrganization } from "../../../../../idp/organization";
import { ReducedUser } from "../../../../../idp/user";
import { DesignContent } from "./StreamDesign";

export interface Design {
    _id: string;
    name: string;
    design: DesignContent;
    build?: unknown;
    streamId: string;
    event: ReducedEvent;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}
