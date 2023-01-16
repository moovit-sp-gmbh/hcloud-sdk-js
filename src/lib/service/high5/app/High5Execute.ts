import base from "../../../base";
import { EventExecutionRequest, StreamExecutionPackage, StreamExecutionRequest, StreamLog, StreamResult } from "../../../interfaces/High5";

export class High5Execute extends base {
    /**
     * executeStreamById executes a single stream by its ID and an execution request
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
     * executeEventByName executes all streams within an event by its app ID as well as the event execution request. The request contains the event name.
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

    /**
     * Requests the StreamExecutionPackage from high5
     * @param streamId the id of the stream
     * @param secret the secret of the stream execution object
     * @returns StreamExecutionPackage
     */
    public getStreamExecutionPackage = async (streamId: string, secret: string): Promise<StreamExecutionPackage> => {
        const resp = await this.axios
            .get<StreamExecutionPackage>(this.getEndpoint(`/v1/execute/stream/${streamId}/secret/${secret}`))
            .catch((err: Error) => {
                throw err;
            });
        return resp.data;
    };

    /**
     * Publishes the stream results to high5
     * @param streamId the id of the stream
     * @param secret the secret of the stream execution object
     * @param streamResult the result of the stream
     * @returns StreamLog
     */
    public writeStreamLog = async (streamId: string, secret: string, streamResult: StreamResult): Promise<StreamLog> => {
        const resp = await this.axios
            .post<StreamLog>(this.getEndpoint(`/v1/execute/stream/${streamId}/secret/${secret}/log`), streamResult)
            .catch((err: Error) => {
                throw err;
            });
        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
