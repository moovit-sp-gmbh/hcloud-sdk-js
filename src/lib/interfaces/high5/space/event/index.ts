import { ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";

export interface Event {
    _id: string;
    name: string;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

export type ReducedEvent = Pick<Event, "_id" | "name">;
