import { ReducedOrganization } from "../..";
import { ReducedUser } from "../../../user";

export enum VerificationStatus {
    verified = "verified",
    waiting = "waiting",
    error = "error",
}

/**
 * Single sign-on configuration of a Domain as returned by the API. The OIDC client secret is never returned.
 */
export type SSOProvider =
    | {
          type: "oidc";
          clientId: string;
          discoveryEndpoint?: string;
          authorizationEndpoint?: string;
          tokenEndpoint?: string;
      }
    | {
          type: "saml";
          ssoLoginURL: string;
          ssoLogoutURL: string;
          /** PEM encoded certificates of the identity provider */
          certificates: string[];
          allowUnencryptedAssertion: boolean;
      };

/**
 * Single sign-on configuration to set on a Domain. Setting it replaces the whole previous configuration.
 */
export type DomainSSOConfig =
    | ({
          type: "oidc";
          clientId: string;
          /** Required for a new OIDC configuration, left out on updates it keeps the stored secret */
          clientSecret?: string;
      } & (
          | { discoveryEndpoint: string; authorizationEndpoint?: never; tokenEndpoint?: never }
          | { authorizationEndpoint: string; tokenEndpoint: string; discoveryEndpoint?: never }
      ))
    | {
          type: "saml";
          ssoLoginURL: string;
          ssoLogoutURL: string;
          /** PEM encoded certificates, one string may contain several certificates */
          certificates: string[];
          allowUnencryptedAssertion?: boolean;
      };

export interface DomainPatch {
    /** New name, the renamed Domain has to be verified again */
    name?: string;
    /** New single sign-on configuration, null removes it */
    sso?: DomainSSOConfig | null;
}

export interface Domain {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    verified: boolean;
    verificationStatus: VerificationStatus;
    uuid: string;
    creator: ReducedUser;
    /** Only used for login once the Domain is verified */
    sso?: SSOProvider;
    createDate: number;
    modifyDate: number;
}
