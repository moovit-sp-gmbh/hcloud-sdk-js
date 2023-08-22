import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { StreamResult, StreamLog } from "../../../../../interfaces/high5";

export class High5ExecuteLog extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Writes Stream logs during execution or after execution is finished. The nodeResults property of the provided streamResult is meant to only have
     * new results as they will be appended to any old ones already send via another request.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param streamId ID of the Stream
     * @param secret Secret of the stream log
     * @param streamResult Result of the stream
     */
    public writeStreamLog = async (orgName: string, spaceName: string, secret: string, streamResult: StreamResult): Promise<void> => {
        await this.axios
            .patch<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/logs/${secret}`), streamResult)
            .catch((err: Error) => {
                throw err;
            });
    };

    /**
     * Retrieves all stream execution logs for a given space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @returns Array of Stream execution logs as well as the total number of results
     */
    public getStreamExecutionLogsOfSpace = async (orgName: string, spaceName: string): Promise<[StreamLog[], number]> => {
        const resp = await this.axios
            .get<StreamLog[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/logs`))
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
     * @returns Array of Stream execution logs as well as the total number of results
     */
    public getStreamExecutionLogs = async (orgName: string, spaceName: string, streamId: string): Promise<[StreamLog[], number]> => {
        const resp = await this.axios
            .get<StreamLog[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/logs/streams/${streamId}`))
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
     * @returns The requested stream execution log
     */
    public getStreamExecutionLog = async (orgName: string, spaceName: string, streamLogId: string): Promise<[StreamLog, number]> => {
        const resp = await this.axios
            .get<StreamLog>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/logs/${streamLogId}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
