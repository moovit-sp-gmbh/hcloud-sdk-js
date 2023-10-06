import { OrganizationRole, ReducedOrganization } from "../../../organization";
import { ReducedUser } from "../../../user";

export enum InvitationStatus {
    /**
     * The invitation was accepted.
     */
    ACCEPTED = "ACCEPTED",
    /**
     * The invitation was rejected.
     */
    REJECTED = "REJECTED",
    /**
     * There has been no response to the invitation.
     */
    PENDING = "PENDING",
}

export interface OrganizationMemberInvitation {
    _id: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    email: string;
    status: InvitationStatus;
    role: OrganizationRole;
    createDate: number;
    modifyDate: number;
}
