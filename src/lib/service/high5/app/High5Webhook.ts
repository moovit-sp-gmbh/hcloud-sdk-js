import { AxiosInstance, AxiosRequestHeaders } from "axios";
import base, { Options } from "../../../base";
import { KeyValuePair, Webhook, WebhookCreation } from "../../../interfaces/High5";
import { High5WebhookLog } from "./webhook/High5WebhookLog";

export class High5Webhook extends base {
    public log: High5WebhookLog;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.log = new High5WebhookLog(this.options, this.axios);
    }

    /**
     * getWebhooks requests all webhooks for the user's active organization
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param limit an optional response limit (1-1000; defaults to 500)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns an array of webhooks and the total number of webhooks (independent of the limit and page)
     */
    public getWebhooks = async (orgName: string, appName: string, limit?: number, page?: number): Promise<[Webhook[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<Webhook[]>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/webhooks?limit=${limit}&page=${page}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getWebhookById requests the specified webhook by ID
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param webhookId the ID of the webhook to be retrieved
     * @returns the webhook
     */
    public getWebhookById = async (orgName: string, appName: string, webhookId: string): Promise<Webhook> => {
        const resp = await this.axios
            .get<Webhook>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/webhooks/${webhookId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * regenerateWebhookUrl creates a new URL for the specified webhook. This is suggested if a leak of the current URL is likely.
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param webhookId of the webhook to be retrieved
     * @returns the webhook with the regenerated URL
     */
    public regenerateWebhookUrl = async (orgName: string, appName: string, webhookId: string): Promise<Webhook> => {
        const resp = await this.axios
            .patch<Webhook>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/webhooks/${webhookId}/regenerateUrl`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createWebhook creates a new webhook for the user's active organization
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param webhookCreation is an object/JSON containing the name, token, eventId, appId, target and (optionally) security headers for the new webhook
     * @returns the newly created webhook
     */
    public createWebhook = async (orgName: string, appName: string, webhookCreation: WebhookCreation): Promise<Webhook> => {
        const resp = await this.axios
            .post<Webhook>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/webhooks`), webhookCreation)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * updateWebhook updates an existing webhook
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param webhookId of the webhook to be updated
     * @param webhookCreation is an object/JSON containing the name, token, eventId, appId, target and (optionally) security headers for the updated webhook
     * @returns the updated webhook
     */
    public updateWebhook = async (orgName: string, appName: string, webhookId: string, webhookCreation: WebhookCreation): Promise<Webhook> => {
        const resp = await this.axios
            .put<Webhook>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/webhooks/${webhookId}`), webhookCreation)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteWebhook deletes the specified webhook
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param webhookId the ID of the webhook to be deleted
     * @returns void
     */
    public deleteWebhook = async (orgName: string, appName: string, webhookId: string): Promise<void> => {
        const resp = await this.axios
            .delete<Webhook[]>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/webhook/${webhookId}`))
            .catch((err: Error) => {
                throw err;
            });
    };

    /**
     * triggerWebhook triggers all events and streams of the specified webhook
     * @param url of the webhook to be triggered / executed
     * @returns void
     */
    public triggerWebhook = async (url: string): Promise<void> => {
        const resp = await this.axios.post<void>(this.getEndpoint(`${url}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * Executes a webhook by its URL
     * @param webhookUrl from the webhookDto
     * @param payload the payload to be used in the event execution that will be triggered by the webhook, as JSON.
     * @param headers optional security headers.
     * @returns void the webhook is executed asynchronously, and we do not wait for a result or response
     */
    public executeWebhookByUrl = async (webhookUrl: string, payload: any, headers?: KeyValuePair<string>): Promise<void> => {
        const h = {} as { [key: string]: string };
        if (headers) {
            Object.keys(headers).forEach((key: string) => {
                h[key] = headers[key];
            });
        }
        await this.axios.post<void>(this.getEndpoint(webhookUrl), payload, { headers: h }).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * validateWebhookUrl will return the challenge
     * @param url of the webhook to be validated
     * @returns the provided challenge string
     */
    public validateWebhookUrl = async (url: string, challenge: string): Promise<string> => {
        const resp = await this.axios.get<string>(this.getEndpoint(`${url}?challenge=${challenge}`)).catch((err: Error) => {
            throw err;
        });
        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
