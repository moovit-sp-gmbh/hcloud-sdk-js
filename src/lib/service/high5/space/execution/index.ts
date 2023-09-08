import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { WaveEngine, WaveRelease } from "../../../../interfaces/high5/wave";
import {
    High5ExecutionPackage,
    High5ExecutionPatch,
    High5ExecutionRequest,
    High5ExecutionResponse,
} from "../../../../interfaces/high5/space/execution";
import { High5ExecutionLogs } from "./log/index";
import { High5ExecutionStates } from "./status/index";

export class High5Execute extends Base {
    public high5ExecutionLogs: High5ExecutionLogs;
    public high5ExecutionStates: High5ExecutionStates;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.high5ExecutionLogs = new High5ExecutionLogs(options, axios);
        this.high5ExecutionStates = new High5ExecutionStates(options, axios);
    }

    /**
     * executeStream executes a single stream by its ID and an execution request
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId to identify the stream
     * @param high5ExecutionRequest the stream execution request, containing the data, target, wait boolean and timeout
     * @returns the stream result
     */
    public executeHigh5Stream = async (
        orgName: string,
        spaceName: string,
        streamId: string,
        high5ExecutionRequest: High5ExecutionRequest
    ): Promise<High5ExecutionResponse> => {
        const resp = await this.axios
            .post<High5ExecutionResponse>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/stream/id/${streamId}`),
                high5ExecutionRequest
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Executes all streams within an event.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the Event
     * @param eventExecutionRequest Event execution request containing payload, target and a boolean specifying if it should be a dry run
     * @returns Array of stream results
     */
    public executeHigh5Event = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        high5EventExecutionRequest: High5ExecutionRequest
    ): Promise<High5ExecutionResponse[]> => {
        const resp = await this.axios
            .post<High5ExecutionResponse[]>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/event/name/${eventName}`),
                high5EventExecutionRequest
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Requests the StreamExecutionPackage for the provided Stream, which will hold all informations required to execute the Stream.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param streamId ID of the Stream
     * @param secret Secret of the Stream execution object
     * @returns StreamExecutionPackage
     */
    public getStreamExecutionPackage = async (
        orgName: string,
        spaceName: string,
        streamId: string,
        secret: string
    ): Promise<High5ExecutionPackage> => {
        const resp = await this.axios
            .get<High5ExecutionPackage>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/stream/id/${streamId}/package/${secret}`))
            .catch((err: Error) => {
                throw err;
            });
        return resp.data;
    };

    /**
     * Publishes the stream status and logs to high5
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId the id of the stream
     * @param secret the secret of the stream execution object
     * @param streamResult the result of the stream
     * @returns StreamLog
     */
    public high5ExecutionStatusAndLogResponse = async (
        orgName: string,
        spaceName: string,
        secret: string,
        high5ExecutionResponse: High5ExecutionPatch
    ): Promise<void> => {
        await this.axios
            .patch<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/${secret}`), high5ExecutionResponse)
            .catch((err: Error) => {
                throw err;
            });
    };

    /**
     * Requests all available wave engine releases and reports a short info object
     * @param orgName Name of the Organization
     * @returns Array of WaveRelease objects
     */
    public fetchAllWaveEngineReleaseTags = async (orgName: string): Promise<WaveRelease[]> => {
        const resp = await this.axios.get<WaveRelease[]>(this.getEndpoint(`/v1/org/${orgName}/wave/releases`)).catch((err: Error) => {
            throw err;
        });
        return resp.data;
    };

    /**
     * Requests a single wave engine release version
     * @param orgName Name of the Organization
     * @param releaseVersion Release version in the following format: v0.0.1 or v0.0.1-5
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