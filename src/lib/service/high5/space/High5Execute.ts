import base from "../../../base";
import * as High5 from "../../../interfaces/High5";
import { WaveEngine, WaveRelease } from "../../../interfaces/High5";

export class High5Execute extends base {
    /**
     * executeStreamById executes a single stream by its ID and an execution request
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId to identify the stream
     * @param executionRequest the stream execution request, containing the data, target, wait boolean and timeout
     * @returns the stream result
     */
    public executeStreamById = async (
        orgName: string,
        spaceName: string,
        streamId: string,
        executionRequest: High5.StreamExecutionRequest
    ): Promise<High5.StreamResult> => {
        const resp = await this.axios
            .post<High5.StreamResult>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/stream/id/${streamId}`), executionRequest)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * executeEventByName executes all streams within an event by its space ID as well as the event execution request. The request contains the event name.
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param eventExecutionRequest the event execution request, containing the event name, data, target, wait bool and timeout
     * @returns an array of stream results
     */
    public executeEventByName = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        executionRequest: High5.EventExecutionRequest
    ): Promise<High5.StreamResult[]> => {
        const resp = await this.axios
            .post<High5.StreamResult[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/event/name/${eventName}`), executionRequest)
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
        const resp = await this.axios.get<High5.StreamResult[]>(webhookUrl + "?challenge=" + challenge).catch((err: Error) => {
            throw err;
        });
        return resp.data.toString();
    };

    /**
     * Requests the StreamExecutionPackage from high5
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId the id of the stream
     * @param secret the secret of the stream execution object
     * @returns StreamExecutionPackage
     */
    public getStreamExecutionPackage = async (
        orgName: string,
        spaceName: string,
        streamId: string,
        secret: string
    ): Promise<High5.StreamExecutionPackage> => {
        const resp = await this.axios
            .get<High5.StreamExecutionPackage>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/stream/id/${streamId}/package/${secret}`)
            )
            .catch((err: Error) => {
                throw err;
            });
        return resp.data;
    };

    /**
     * Publishes the stream results to high5
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId the id of the stream
     * @param secret the secret of the stream execution object
     * @param streamResult the result of the stream
     * @returns StreamLog
     */
    public writeStreamLog = async (
        orgName: string,
        spaceName: string,
        secret: string,
        streamResult: High5.StreamResult
    ): Promise<High5.StreamLog> => {
        const resp = await this.axios
            .patch<High5.StreamLog>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/logs/${secret}`), streamResult)
            .catch((err: Error) => {
                throw err;
            });
        return resp.data;
    };

    /**
     * Requests all available wave engine releases and reports a short info object
     * @param orgName the organizations's name
     * @returns WaveReleaseDto[]
     */
    public fetchAllWaveEngineReleaseTags = async (orgName: string): Promise<WaveRelease[]> => {
        const resp = await this.axios.get<WaveRelease[]>(this.getEndpoint(`/v1/org/${orgName}/wave/releases`)).catch((err: Error) => {
            throw err;
        });
        return resp.data;
    };

    /**
     * Requests a single wave engine release version
     * @param orgName the organizations's name
     * @param releaseVersion the release version in the following format v0.0.1 or v0.0.1-5
     * @returns WaveRelease
     */
    public fetchWaveEngineRelease = async (orgName: string, releaseVersion: string): Promise<WaveEngine> => {
        const resp = await this.axios.get<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/wave/releases/${releaseVersion}`)).catch((err: Error) => {
            throw err;
        });
        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
