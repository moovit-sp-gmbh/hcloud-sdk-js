import base from "../../base";
import { EventExecutionRequest, StreamExecutionRequest, StreamResult } from "../../interfaces/High5";

export class High5Execute extends base {
    /**
     * executeStream executes a single stream by its ID and an execution request
     * @param streamId to identify the stream
     * @param executionRequest the stream execution request, containing the data, target, wait boolean and timeout
     * @returns the stream result
     */
    public executeStreamById = async (streamId: string, executionRequest: StreamExecutionRequest): Promise<StreamResult> => {
        const resp = await this.axios
            .post<StreamResult>(this.getEndpoint(`/v1/execute/stream/id/${streamId}`), executionRequest)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * executeEvent executes all streams within an event by its app ID as well as the event execution request. The request contains the event name.
     * @param appId the app that the event is subordinate to
     * @param eventExecutionRequest the event execution request, containing the event name, data, target, wait bool and timeout
     * @returns an array of stream results
     */
    public executeEventByName = async (appId: string, executionRequest: EventExecutionRequest): Promise<StreamResult[]> => {
        const resp = await this.axios
            .post<StreamResult[]>(this.getEndpoint(`/v1/execute/event/name/${appId}`), executionRequest)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Executes a webhook by its URL
     * @param webhookUrl from the webhookDto
     * @param payload the payload to be used in the event execution that will be triggered by the webhook, as JSON.
     * @returns void the webhook is executed asynchronously, and we do not wait for a result or response
     */
    public executeWebhookByUrl = async (webhookUrl: string, payload: any): Promise<void> => {
        await this.axios.post<StreamResult[]>(webhookUrl, payload).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * Validates the given webhook URL by sending a challenge query parameter.
     * @param webhookUrl to be validated
     * @param challenge string to be returned
     * @returns the provided challenge string as plaint text
     */
    public validateWebhookUrl = async (webhookUrl: string, challenge: string): Promise<string> => {
        const resp = await this.axios.get<StreamResult[]>(webhookUrl + "?challenge=" + challenge).catch((err: Error) => {
            throw err;
        });
        return resp.data.toString();
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
