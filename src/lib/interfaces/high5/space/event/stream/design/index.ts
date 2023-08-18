import { ReducedOrganization } from "../../../../../idp/organization";
import { ReducedUser } from "../../../../../idp/user";

export interface Design {
    _id: string;
    name: string;
    design: any;
    build?: any;
    streamId: string;
    event: string;
    space: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}
