import { ReducedOrganization } from "../idp/organization/Organization";
import { ReducedUser } from "../idp/user/User";

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

export interface Webhook {
    _id: string;
    name: string;
    url: string;
    type: WebhookType;
    sub: EventWebhook | SpaceWebhook | FrameIoWebhook;
    webhookEncryptionSettings?: WebhookEncryptionSettings;
    securityHeaders?: SecurityHeader[];
    spaceId: string;
    target: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}

export interface WebhookCreation {
    name: string;
    target: string;
    type: WebhookType;
    sub: EventWebhook | SpaceWebhook | FrameIoWebhook;
    webhookEncryptionSettings?: WebhookEncryptionSettings;
    securityHeaders?: SecurityHeader[];
}

export interface WebhookUpdate {
    name?: string;
    target?: string;
    type?: WebhookType;
    sub?: EventWebhook | SpaceWebhook | FrameIoWebhook;
    webhookEncryptionSettings?: WebhookEncryptionSettings;
    deleteWebhookEncryptionSettings?: boolean;
    securityHeaders?: SecurityHeader[];
    deleteSecurityHeaders?: boolean;
}

export interface WebhookLog {
    _id: string;
    webhookId: string;
    space: string;
    organization: ReducedOrganization;
    eventId: string;
    timestamp: number;
    sourceIp: string;
    completeHeader: unknown;
    requestBody: unknown;
    responseStatusCode: number;
    responseBody: string;
}

export interface KeyValuePair<T> {
    [key: string]: T;
}
