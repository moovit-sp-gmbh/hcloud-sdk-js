import { ReducedOrganization } from "../..";
import { ReducedUser } from "../../../user";
import { OIDCProvider } from "./oidc";
import { FullSAMLProvider } from "./saml";

export enum VerificationStatus {
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

export type SSOProvider = (FullSAMLProvider & { type: "saml" }) | (OIDCProvider & { type: "oidc" });
