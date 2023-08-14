import { ReducedOrganization } from "../idp/organization/Organization";
import { ReducedUser } from "../idp/user/User";

export interface Event {
    _id: string;
    name: string;
    space: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}
