import { ReducedOrganization } from "../..";
import { ReducedUser } from "../../../user";
import { Scope } from "../../../user/Scopes";

export interface OAuthAppClientSecret {
    name: string;
    secret: string;
    uuid: string;
    creatorId: string;
    used: boolean;
    createDate: number;
    modifyDate: number;
}

export interface OAuthApp {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    avatarUrl: string;
    description?: string;
    homepage?: string;
    callback: string[];
    hcloudClientId: string;
    clientSecrets: OAuthAppClientSecret[];
    scopes: Scope[];
    patId?: string;
    createDate: number;
    modifyDate: number;
}

export type OAuthAppWithConsent = OAuthApp &
    Omit<OAuthApp, "hcloudClientId" | "clientSecrets" | "callback"> & {
        scopes: Record<Scope, number>;
    };

export interface OAuthAppCreate {
    name: string;
    description?: string;
    homepage?: string;
    callback: string[];
}
