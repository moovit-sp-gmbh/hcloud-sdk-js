import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../../../Base";
import { ExecutionTree, High5ExecutionStatus } from "../../../../../interfaces/high5/space/execution";

export class High5SpaceExecutionStates extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves an execution status by ID.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param executionStatusId ID of the execution status
     * @returns High5ExecutionStatus
     */
    async getStreamExecutionStatus<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        executionStatusId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, High5ExecutionStatus>> {
        const resp = await this.axios.get<High5ExecutionStatus>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/status/${executionStatusId}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, High5ExecutionStatus>;
    }

    /**
     * Retrieves the complete executionTree the stream execution belongs to. An executionTree represents the hierarchical structure of stream executions initiated by a 'Trigger Stream' node.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param executionStatusId ID of the execution status
     * @returns ExecutionTree
     */
    async getExecutionTree<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        executionStatusId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ExecutionTree>> {
        const resp = await this.axios.get<ExecutionTree>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/executionTree/${executionStatusId}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ExecutionTree>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
