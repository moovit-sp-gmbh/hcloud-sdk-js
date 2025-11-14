import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { KeyValuePair, Webhook, WebhookCreate, WebhookUpdate } from "../../../../interfaces/high5/space/webhook";
import { High5WebhookLog } from "./log";

export class High5Webhook extends Base {
    public get log(): High5WebhookLog {
        if (this._log === undefined) {
            this._log = new High5WebhookLog(this.options, this.axios);
        }
        return this._log;
    }
    private _log?: High5WebhookLog;

    /**
     * Retrieves all Webhooks of the specified space that match the provided search filter(s). Will return all Webhooks if no search filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Webhooks and the total number of results found in the database (independent of limit and page)
     */
    async searchWebhooks<R extends boolean = false>(
        { orgName, spaceName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string; spaceName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Webhook>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Webhook[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/search?limit=${limit}&page=${page}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<Webhook>
        >;
    }

    /**
     * Requests a Webhhok by its ID.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the Webhook
     * @returns The requested Webhook
     */
    async getWebhook<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        webhookId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Webhook>> {
        const resp = await this.axios.get<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Webhook>;
    }

    /**
     * Generates a new URL for the specified Webhook. This is suggested if a leak of the current URL is likely.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the Webhook
     * @returns The updated Webhook
     */
    async regenerateWebhookUrl<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        webhookId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Webhook>> {
        const resp = await this.axios.patch<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}/regenerateUrl`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Webhook>;
    }

    /**
     * Creates a new Webhook in the specified High5 space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param WebhookCreate Object/JSON containing the name, token, eventId, spaceId, target and (optionally) security headers for the new webhook
     * @returns The created Webhook
     */
    async createWebhook<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        WebhookCreate: WebhookCreate,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Webhook>> {
        const resp = await this.axios.post<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks`), WebhookCreate);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Webhook>;
    }

    /**
     * Updates an existing Webhook.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the Webhook to be updated
     * @param WebhookCreate Object/JSON containing the name, token, eventId, spaceId, target and (optionally) security headers for the updated webhook
     * @returns the updated Webhook
     */
    async updateWebhook<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        webhookId: string,
        webhookUpdate: WebhookUpdate,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Webhook>> {
        const resp = await this.axios.patch<Webhook>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`), webhookUpdate);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Webhook>;
    }

    /**
     * Deletes a Webhook by its ID.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the webhook to be deleted
     */
    async deleteWebhook<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        webhookId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Webhook[]>> {
        const resp = await this.axios.delete<Webhook[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Webhook[]>;
    }

    /**
     * Executes all Events and Streams connected to the specified Webhook.
     * @param webhookUrl URL of the webhook to be triggered / executed
     */
    async triggerWebhook<R extends boolean = false>(webhookUrl: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post<void>(this.getEndpoint(webhookUrl));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Executes a webhook by its URL.
     * @param webhookUrl Webhook URL to be triggered / executed (your hcloud domain + webhook.relativeUrl)
     * @param payload Payload to be used in the event execution that will be triggered by the webhook, as JSON.
     * @param headers (optional) Security headers.
     */
    async executeWebhookByUrl<R extends boolean = false>(
        webhookUrl: string,
        payload: unknown,
        headers?: KeyValuePair<string>,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const h = {} as { [key: string]: string };
        if (headers) {
            Object.keys(headers).forEach((key: string) => {
                h[key] = headers[key];
            });
        }
        const resp = await this.axios.post<void>(this.getEndpoint(webhookUrl), payload, {
            headers: h,
        });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Respond to a webhook via callback.
     * @param callbackURL            Full or partial URL callback URL. This URL is unique per webhook execution
     * @param status                 HTTP status code to send in the response
     * @param headers     (optional) HTTP headers to send in the response
     * @param body        (optional) Body to send in the HTTP response
     */
    async respondToWebhook<R extends boolean = false>(
        callbackURL: string,
        status: number,
        headers?: Record<string, string | string[]>,
        body?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const url = callbackURL.startsWith("http") ? callbackURL : this.getEndpoint(callbackURL);
        const resp = await this.axios.post<void>(url, { status, headers: headers ?? {}, body }, { headers: { "Content-Type": "application/json" } });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Validates the provided webhook URL by sending a challenge query parameter.
     * @param url Webhook URL to be validated (your hcloud domain + webhook.relativeUrl)
     * @param challenge String to be returned
     * @returns The provided challenge string as plaint text
     */
    async validateWebhookUrl<R extends boolean = false>(webhookUrl: string, challenge: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.get<string>(this.getEndpoint(`${webhookUrl}?challenge=${challenge}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
