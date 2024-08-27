import { ReducedOrganization, ReducedUser } from "../../idp";

export interface JoinToken {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    token: string;
    createDate: number;
    modifyDate: number;
}
