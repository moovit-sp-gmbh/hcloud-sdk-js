import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { High5ExecutionStatus } from "../../../../../interfaces/high5/space/execution";

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
    async getStreamExecutionStatus(orgName: string, spaceName: string, executionStatusId: string): Promise<High5ExecutionStatus> {
        const resp = await this.axios.get<High5ExecutionStatus>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/status/${executionStatusId}`)
        );

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
