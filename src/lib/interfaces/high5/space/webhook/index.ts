import { ReducedSpace } from "../../../global"
import { ReducedOrganization } from "../../../idp/organization"
import { ReducedUser } from "../../../idp/user"
import { ReducedEvent } from "../event"

export enum WebhookType {
    EVENT = "EVENT",
    SPACE = "SPACE",
    FRAME_IO = "FRAME_IO",
}

export interface SecurityHeader {
    key: string;
    value: string;
}

export interface EventWebhook {
    eventName: string;
}

export interface SpaceWebhook {
    eventPrefix: string;
    jsonPathMapping: string;
}

export interface FrameIoWebhook {
    eventName: string;
    secret: string;
}

export interface WebhookEncryptionSettings {
    hmacHeaderName: string;
    hmacAlgorithm: string;
    hmacSecret: string;
}

export interface NetworkSettings {
    addressWhiteList?: string[];
    addressBlackList?: string[];
}
export interface Webhook {
    _id: string;
    name: string;
    relativeUrl: string;
    type: WebhookType;
    sub: EventWebhook | SpaceWebhook | FrameIoWebhook;
    webhookEncryptionSettings?: WebhookEncryptionSettings;
    securityHeaders?: SecurityHeader[];
    networkSettings?: NetworkSettings;
    space: ReducedSpace;
    target: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
    lastTriggered?: {
        timestamp: number;
        statusCode: number;
        error?: string;
    };
}

export type WebhookCreate = Pick<Webhook, "name" | "target" | "type" | "sub" | "webhookEncryptionSettings" | "securityHeaders">;

export type WebhookUpdate = Partial<WebhookCreate> & {
    deleteWebhookEncryptionSettings?: boolean;
    deleteSecurityHeaders?: boolean;
};

export interface WebhookLog {
    _id: string;
    webhookId: string;
    space: ReducedSpace;
    organization: ReducedOrganization;
    event: ReducedEvent;
    executeDate: number;
    sourceIp: string;
    completeHeader: KeyValuePair<string>;
    requestBody: unknown;
    responseStatusCode: number;
    responseBody: string;
}

export interface KeyValuePair<T> {
    [key: string]: T;
}
