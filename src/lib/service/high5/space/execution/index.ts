import Base from "../../../../Base";
import { DebugCommand } from "../../../../interfaces/high5";
import {
    High5ExecutionPackage,
    High5ExecutionPatch,
    High5ExecutionRequest,
    High5ExecutionResponse,
} from "../../../../interfaces/high5/space/execution";
import { High5SpaceExecutionLogs } from "./log/index";
import { High5SpaceExecutionStates } from "./status/index";

export class High5SpaceExecute extends Base {
    public get high5ExecutionLogs(): High5SpaceExecutionLogs {
        if (this._high5ExecutionLogs === undefined) {
            this._high5ExecutionLogs = new High5SpaceExecutionLogs(this.options, this.axios);
        }
        return this._high5ExecutionLogs;
    }
    private _high5ExecutionLogs?: High5SpaceExecutionLogs;
    public get high5ExecutionStates(): High5SpaceExecutionStates {
        if (this._high5ExecutionStates === undefined) {
            this._high5ExecutionStates = new High5SpaceExecutionStates(this.options, this.axios);
        }
        return this._high5ExecutionStates;
    }
    private _high5ExecutionStates?: High5SpaceExecutionStates;

    /**
     * executeStream executes a single stream by its ID and an execution request
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId to identify the stream
     * @param high5ExecutionRequest the stream execution request, containing the data, target, wait boolean and timeout
     * @param design if true the stream will execute the current design rather than the published design build
     * @param debug if true the stream will execute in debug mode and consider breakpoints
     * @param overrideUserAgent if true the User-Agent header will be overwritten with "hcloud-stream" to identify this execution got triggered from within a stream with the TriggerStreamAction node
     * @returns the stream result
     */
    async executeHigh5Stream(
        orgName: string,
        spaceName: string,
        streamId: string,
        high5ExecutionRequest: High5ExecutionRequest,
        design = false,
        debug = false,
        overrideUserAgent = false
    ): Promise<High5ExecutionResponse> {
        if (overrideUserAgent) {
            this.axios.defaults.headers.common["User-Agent"] = "hcloud-stream";
        }
        const resp = await this.axios.post<High5ExecutionResponse>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/stream/id/${streamId}`),
            high5ExecutionRequest,
            {
                params: {
                    design,
                    debug,
                },
            }
        );

        return resp.data;
    }

    /**
     * Executes all streams within an event.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the Event
     * @param eventExecutionRequest Event execution request containing payload, target and a boolean specifying if it should be a dry run
     * @returns Array of stream results
     */
    async executeHigh5Event(
        orgName: string,
        spaceName: string,
        eventName: string,
        high5EventExecutionRequest: High5ExecutionRequest
    ): Promise<High5ExecutionResponse[]> {
        const resp = await this.axios.post<High5ExecutionResponse[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/event/name/${eventName}`),
            high5EventExecutionRequest
        );

        return resp.data;
    }

    /**
     * Requests the StreamExecutionPackage for the provided Stream, which will hold all informations required to execute the Stream.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param streamId ID of the Stream
     * @param secret Secret of the Stream execution object
     * @returns StreamExecutionPackage
     */
    async getStreamExecutionPackage(orgName: string, spaceName: string, streamId: string, secret: string): Promise<High5ExecutionPackage> {
        const resp = await this.axios.get<High5ExecutionPackage>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/stream/id/${streamId}/package/${secret}`)
        );

        return resp.data;
    }

    /**
     * Publishes the stream status and logs to high5
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId the id of the stream
     * @param secret the secret of the stream execution object
     * @param streamResult the result of the stream
     * @returns StreamLog
     */
    async high5ExecutionStatusAndLogResponse(
        orgName: string,
        spaceName: string,
        secret: string,
        high5ExecutionResponse: High5ExecutionPatch
    ): Promise<void> {
        await this.axios.patch<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/${secret}`), high5ExecutionResponse);
    }

    /**
     * Issue debug command to a stopped execution running in debug mode.
     * If the agent that is handling this execution does not acknowledge
     * the debug command after a certain timeframe, a timeout error will
     * be thrown.
     *
     * Only the user that triggered the execution can send debug commands.
     *
     * @param orgName      Name of the organization
     * @param spaceName    Name of the space
     * @param executionId  ID of the execution. Obtained from High5ExecutionResponse
     * @param command      DebugCommand to send
     */
    async issueDebugCommand(orgName: string, spaceName: string, executionId: string, command: DebugCommand): Promise<void> {
        await this.axios.post<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/${executionId}`), command);
    }

    /**
     * Log an execution crash to High5
     *
     * Useful when regular logging is not possible.
     *
     * @param orgName    the organizations's name
     * @param spaceName  the spaces's name
     * @param streamId   the id of the stream
     * @param secret     the secret of the stream execution object
     * @param message    crash log
     */
    async logExecutionCrash(orgName: string, spaceName: string, secret: string, message?: string): Promise<void> {
        await this.axios.patch<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/${secret}/crash`), { message });
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
