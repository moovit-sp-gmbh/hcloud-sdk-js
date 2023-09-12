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
     * Retrieves all Webhooks of the specified space that match the provided search filter(s). Will return all Webhooks if no search filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Webhooks and the total number of results found in the database (independent of limit and page)
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

        const resp = await this.axios.post<Webhook[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/search?limit=${limit}&page=${page}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Requests a Webhhok by its ID.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the Webhook
     * @returns The requested Webhook
     */
    public getWebhook = async (orgName: string, spaceName: string, webhookId: string): Promise<Webhook> => {
        const resp = await this.axios.get<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`));

        return resp.data;
    };

    /**
     * Generates a new URL for the specified Webhook. This is suggested if a leak of the current URL is likely.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the Webhook
     * @returns The updated Webhook
     */
    public regenerateWebhookUrl = async (orgName: string, spaceName: string, webhookId: string): Promise<Webhook> => {
        const resp = await this.axios.patch<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}/regenerateUrl`));

        return resp.data;
    };

    /**
     * Creates a new Webhook in the specified High5 space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookCreation Object/JSON containing the name, token, eventId, spaceId, target and (optionally) security headers for the new webhook
     * @returns The created Webhook
     */
    public createWebhook = async (orgName: string, spaceName: string, webhookCreation: WebhookCreation): Promise<Webhook> => {
        const resp = await this.axios.post<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks`), webhookCreation);

        return resp.data;
    };

    /**
     * Updates an existing Webhook.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the Webhook to be updated
     * @param webhookCreation Object/JSON containing the name, token, eventId, spaceId, target and (optionally) security headers for the updated webhook
     * @returns the updated Webhook
     */
    public updateWebhook = async (orgName: string, spaceName: string, webhookId: string, webhookUpdate: WebhookUpdate): Promise<Webhook> => {
        const resp = await this.axios.patch<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`), webhookUpdate);

        return resp.data;
    };

    /**
     * Deletes a Webhook by its ID.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the webhook to be deleted
     */
    public deleteWebhook = async (orgName: string, spaceName: string, webhookId: string): Promise<void> => {
        await this.axios.delete<Webhook[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`));
    };

    /**
     * Executes all Events and Streams connected to the specified Webhook.
     * @param webhookUrl URL of the webhook to be triggered / executed
     */
    public triggerWebhook = async (webhookUrl: string): Promise<void> => {
        await this.axios.post<void>(this.getEndpoint(webhookUrl));
    };

    /**
     * Executes a webhook by its URL.
     * @param webhookUrl Webhook URL to be triggered / executed (your hcloud domain + webhook.relativeUrl)
     * @param payload Payload to be used in the event execution that will be triggered by the webhook, as JSON.
     * @param headers (optional) Security headers.
     */
    public executeWebhookByUrl = async (webhookUrl: string, payload: unknown, headers?: KeyValuePair<string>): Promise<void> => {
        const h = {} as { [key: string]: string };
        if (headers) {
            Object.keys(headers).forEach((key: string) => {
                h[key] = headers[key];
            });
        }
        await this.axios.post<void>(this.getEndpoint(webhookUrl), payload, {
            headers: h,
        });
    };

    /**
     * Validates the provided webhook URL by sending a challenge query parameter.
     * @param url Webhook URL to be validated (your hcloud domain + webhook.relativeUrl)
     * @param challenge String to be returned
     * @returns The provided challenge string as plaint text
     */
    public validateWebhookUrl = async (webhookUrl: string, challenge: string): Promise<string> => {
        const resp = await this.axios.get<string>(this.getEndpoint(`${webhookUrl}?challenge=${challenge}`));
        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
