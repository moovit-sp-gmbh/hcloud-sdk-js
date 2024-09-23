import Base from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { PaginatedResponse } from "../../../../../interfaces/global";
import { WebhookLog } from "../../../../../interfaces/high5/space/webhook";

export class High5WebhookLog extends Base {
    /**
     * Retrieves all Webhook logs for the specified Webhook.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param webhookId ID of the Webhook
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Webhook logs and the total number of results found in the database (independent of limit and page)
     */
    async getWebhookLogs(
        orgName: string,
        spaceName: string,
        webhookId: string,
        limit?: number,
        page?: number
    ): Promise<PaginatedResponse<WebhookLog>> {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios.get<WebhookLog[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}/logs?limit=${limit}&page=${page}`)
        );

        return createPaginatedResponse(resp) as PaginatedResponse<WebhookLog>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
