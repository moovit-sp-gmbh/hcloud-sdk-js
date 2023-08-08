import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { KeyValuePair, Webhook, WebhookCreation, WebhookUpdate } from "../../../../interfaces/high5/space/webhook";
import { High5WebhookLog } from "./log";
import { SearchFilter, SearchParams } from "../../../../interfaces/global";
import { SearchFilterDTO } from "../../../../helper/searchFilter";

export class High5Webhook extends Base {
    public log: High5WebhookLog;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.log = new High5WebhookLog(this.options, this.axios);
    }

    /**
     * searchWebhooks returns all webhooks for the user's active organization that match the search filter
     * @param {SearchParams & { orgName: string, spaceName: string }} params Search parameters
     * @param {string} params.orgName Name of the organization
     * @param {string} params.spaceName Name of the space
     * @param {SearchFilter[]} [params.filters] an array of search filters
     * @param {Sorting} [params.sorting] an optional sorting direction
     * @param {number} [params.limit=25] an optional response limit limit (1-100; defaults to 25)
     * @param {number} [params.page=0] - an optional page to skip certain results (page * limit; defaults to 0)
     * @returns an array of webhooks and the total number of webhooks (independent of the limit and page)
     */
    public searchWebhooks = async ({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<[Webhook[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios
            .post<Webhook[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/search?limit=${limit}&page=${page}`), {
                filters: filtersDTO,
                sorting: sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getWebhook requests the specified webhook by ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param webhookId the ID of the webhook to be retrieved
     * @returns the webhook
     */
    public getWebhook = async (orgName: string, spaceName: string, webhookId: string): Promise<Webhook> => {
        const resp = await this.axios
            .get<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * regenerateWebhookUrl creates a new URL for the specified webhook. This is suggested if a leak of the current URL is likely.
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param webhookId of the webhook to be retrieved
     * @returns the webhook with the regenerated URL
     */
    public regenerateWebhookUrl = async (orgName: string, spaceName: string, webhookId: string): Promise<Webhook> => {
        const resp = await this.axios
            .patch<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}/regenerateUrl`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createWebhook creates a new webhook for the user's active organization
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param webhookCreation is an object/JSON containing the name, token, eventId, spaceId, target and (optionally) security headers for the new webhook
     * @returns the newly created webhook
     */
    public createWebhook = async (orgName: string, spaceName: string, webhookCreation: WebhookCreation): Promise<Webhook> => {
        const resp = await this.axios
            .post<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks`), webhookCreation)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * updateWebhook updates an existing webhook
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param webhookId of the webhook to be updated
     * @param webhookCreation is an object/JSON containing the name, token, eventId, spaceId, target and (optionally) security headers for the updated webhook
     * @returns the updated webhook
     */
    public updateWebhook = async (orgName: string, spaceName: string, webhookId: string, webhookUpdate: WebhookUpdate): Promise<Webhook> => {
        const resp = await this.axios
            .patch<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`), webhookUpdate)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteWebhook deletes the specified webhook
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param webhookId the ID of the webhook to be deleted
     * @returns void
     */
    public deleteWebhook = async (orgName: string, spaceName: string, webhookId: string): Promise<void> => {
        await this.axios.delete<Webhook[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * triggerWebhook triggers all events and streams of the specified webhook
     * @param webhookUrl of the webhook to be triggered / executed (your hcloud domain + webhook.relativeUrl)
     * @returns void
     */
    public triggerWebhook = async (webhookUrl: string): Promise<void> => {
        await this.axios.post<void>(this.getEndpoint(webhookUrl)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * Executes a webhook by its URL
     * @param webhookUrl of the webhook to be triggered / executed (your hcloud domain + webhook.relativeUrl)
     * @param payload the payload to be used in the event execution that will be triggered by the webhook, as JSON.
     * @param headers optional security headers.
     * @returns void the webhook is executed asynchronously, and we do not wait for a result or response
     */
    public executeWebhookByUrl = async (webhookUrl: string, payload: unknown, headers?: KeyValuePair<string>): Promise<void> => {
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
     * @param webhookUrl of the webhook to be triggered / executed (your hcloud domain + webhook.relativeUrl)
     * @returns the provided challenge string
     */
    public validateWebhookUrl = async (webhookUrl: string, challenge: string): Promise<string> => {
        const resp = await this.axios.get<string>(this.getEndpoint(`${webhookUrl}?challenge=${challenge}`)).catch((err: Error) => {
            throw err;
        });
        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
