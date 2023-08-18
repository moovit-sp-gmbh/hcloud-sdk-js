import { ReducedOrganization } from "../..";
import { ReducedUser } from "../../../user";
import { Scopes } from "../../../user/Scopes";

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
    scopes: Scopes[];
    patId?: string;
    createDate: number;
    modifyDate: number;
}

export interface OAuthAppCreation {
    name: string;
    description?: string;
    homepage?: string;
    callback: string[];
}
