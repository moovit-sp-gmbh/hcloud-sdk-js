import { ReducedOrganization } from "../..";
import { ReducedUser } from "../../../user";

enum VerificationStatus {
    verified = "verified",
    waiting = "waiting",
    error = "error",
}

export interface Domain {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    verified: boolean;
    verificationStatus: VerificationStatus;
    uuid: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}
