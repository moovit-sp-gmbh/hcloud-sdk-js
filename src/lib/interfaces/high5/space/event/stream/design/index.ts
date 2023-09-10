import { ReducedEvent } from "../..";
import { ReducedSpace } from "../../../../../global";
import { ReducedOrganization } from "../../../../../idp/organization";
import { ReducedUser } from "../../../../../idp/user";

export interface Design {
    _id: string;
    name: string;
    design: any;
    build?: any;
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
