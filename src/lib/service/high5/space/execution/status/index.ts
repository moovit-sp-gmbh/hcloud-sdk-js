import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { High5ExecutionStatus } from "../../../../../interfaces/high5/space/execution";

export class High5ExecutionStates extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves all stream execution logs for a given execution inside a space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param high5ExecutionId Id of the execution
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Stream execution logs as well as the total number of results
     */
    public getExecutionStates = async (
        orgName: string,
        spaceName: string,
        high5ExecutionId: string,
        limit = 25,
        page = 0
    ): Promise<[High5ExecutionStatus[], number]> => {
        const resp = await this.axios
            .get<High5ExecutionStatus[]>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/status/${high5ExecutionId}?page=${page}&limit=${limit}`)
            )
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves all stream execution logs for a given stream.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param streamId ID of the stream
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Stream execution logs as well as the total number of results
     */
    public getStreamExecutionStates = async (
        orgName: string,
        spaceName: string,
        streamId: string,
        limit = 25,
        page = 0
    ): Promise<[High5ExecutionStatus[], number]> => {
        const resp = await this.axios
            .get<High5ExecutionStatus[]>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/${streamId}/status?page=${page}&limit=${limit}`)
            )
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves a stream execution log by its ID.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param streamLogId ID of the stream execution log
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns The requested stream execution log
     */
    public getExecutionStatus = async (
        orgName: string,
        spaceName: string,
        statusId: string,
        limit = 25,
        page = 0
    ): Promise<[High5ExecutionStatus, number]> => {
        const resp = await this.axios
            .get<High5ExecutionStatus>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/status/${statusId}?page=${page}&limit=${limit}`)
            )
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
