import { ReducedOrganization } from "./Organization";
import { ReducedUser } from "../user/User";

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
