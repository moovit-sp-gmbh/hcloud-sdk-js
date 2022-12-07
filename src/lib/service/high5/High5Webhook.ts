import base from "../../base";
import { Webhook, WebhookCreation } from "../../interfaces/High5";

export class High5Webhook extends base {
    /**
     * getWebhooks requests all webhooks for the user's active organization
     * @param limit an optional response limit (1-1000; defaults to 500)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns an array of webhooks and the total number of webhooks (independent of the limit and page)
     */
    public getWebhooks = async (appId: string, limit?: number, page?: number): Promise<[Webhook[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<Webhook[]>(this.getEndpoint(`/v1/webhook/list/${appId}?limit=${limit}&page=${page}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getWebhookById requests the specified webhook by ID
     * @param id the ID of the webhook to be retrieved
     * @returns the webhook
     */
    public getWebhookById = async (id: string): Promise<Webhook> => {
        const resp = await this.axios.get<Webhook>(this.getEndpoint(`/v1/webhook/${id}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * regenerateWebhookUrl creates a new URL for the specified webhook. This is suggested if a leak of the current URL is likely.
     * @param id of the webhook to be retrieved
     * @returns the webhook with the regenerated URL
     */
    public regenerateWebhookUrl = async (id: string): Promise<Webhook> => {
        const resp = await this.axios.put<Webhook>(this.getEndpoint(`/v1/webhook/${id}/regenerateUrl`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createWebhook creates a new webhook for the user's active organization
     * @param webhookCreation is an object/JSON containing the name, token, eventId, appId, target and (optionally) security headers for the new webhook
     * @returns the newly created webhook
     */
    public createWebhook = async (webhookCreation: WebhookCreation): Promise<Webhook> => {
        const resp = await this.axios.post<Webhook>(this.getEndpoint(`/v1/webhook`), webhookCreation).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * updateWebhook updates an existing webhook
     * @param id of the webhook to be updated
     * @param webhookCreation is an object/JSON containing the name, token, eventId, appId, target and (optionally) security headers for the updated webhook
     * @returns the updated webhook
     */
    public updateWebhook = async (id: string, webhookCreation: WebhookCreation): Promise<Webhook> => {
        const resp = await this.axios.put<Webhook>(this.getEndpoint(`/v1/webhook/${id}`),webhookCreation).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteWebhook deletes the specified webhook
     * @param id the ID of the webhook to be deleted
     * @returns void
     */
    public deleteWebhook = async (id: string): Promise<void> => {
        const resp = await this.axios.delete<Webhook[]>(this.getEndpoint(`/v1/webhook/${id}`)).catch((err: Error) => {
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
