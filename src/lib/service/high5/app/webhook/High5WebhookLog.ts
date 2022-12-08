import { AxiosInstance } from "axios";
import base, { Options } from "../../../../base";
import { WebhookLog } from "../../../../interfaces/High5";

export class High5WebhookLog extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * getWebhookLogs requests all webhook logs for the specified webhook
     * @param limit an optional response limit (1-1000; defaults to 500)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns WebhookLog array and total number of webhook logs of that webhook (independent of the limit and page)
     */
    public getWebhookLogs = async (id: string, limit?: number, page?: number): Promise<[WebhookLog[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<WebhookLog[]>(this.getEndpoint(`/v1/webhook/log/list/${id}?limit=${limit}&page=${page}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
