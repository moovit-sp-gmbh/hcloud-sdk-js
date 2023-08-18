import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { WebhookLog } from "../../../../../interfaces/high5/space/webhook";

export class High5WebhookLog extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * getWebhookLogs requests all webhook logs for the specified webhook
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param webhookId the webhook's id
     * @param limit an optional response limit limit (1-100; defaults to 25)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns WebhookLog array and total number of webhook logs of that webhook (independent of the limit and page)
     */
    public getWebhookLogs = async (
        orgName: string,
        spaceName: string,
        webhookId: string,
        limit?: number,
        page?: number
    ): Promise<[WebhookLog[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios
            .get<WebhookLog[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/webhooks/${webhookId}/logs?limit=${limit}&page=${page}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
