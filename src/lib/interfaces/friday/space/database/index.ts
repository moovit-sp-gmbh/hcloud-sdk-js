import { ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";

interface Database {
    _id: string;
    name: string;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    createDate: number;
}

export { Database };
