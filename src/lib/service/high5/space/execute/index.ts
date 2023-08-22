import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { StreamExecutionRequest, StreamResult, EventExecutionRequest, StreamExecutionPackage } from "../../../../interfaces/high5/space/event/stream";
import { WaveEngine, WaveRelease } from "../../../../interfaces/high5/wave";

export class High5Execute extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Executes a single stream by its ID.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param streamId ID of the Stream
     * @param executionRequest Stream execution request containing payload and target
     * @returns The Stream result
     */
    public executeStream = async (
        orgName: string,
        spaceName: string,
        streamId: string,
        executionRequest: StreamExecutionRequest
    ): Promise<StreamResult> => {
        const resp = await this.axios
            .post<StreamResult>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/stream/id/${streamId}`), executionRequest)
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
    public executeEvent = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        executionRequest: EventExecutionRequest
    ): Promise<StreamResult[]> => {
        const resp = await this.axios
            .post<StreamResult[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/event/name/${eventName}`), executionRequest)
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
    ): Promise<StreamExecutionPackage> => {
        const resp = await this.axios
            .get<StreamExecutionPackage>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/stream/id/${streamId}/package/${secret}`))
            .catch((err: Error) => {
                throw err;
            });
        return resp.data;
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
