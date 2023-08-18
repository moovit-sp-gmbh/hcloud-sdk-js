import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { StreamResult, StreamLog } from "../../../../../interfaces/high5";

export class High5ExecuteLog extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Publishes the stream results to high5
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId the id of the stream
     * @param secret the secret of the stream execution object
     * @param streamResult the result of the stream
     */
    public writeStreamLog = async (orgName: string, spaceName: string, secret: string, streamResult: StreamResult): Promise<void> => {
        await this.axios
            .patch<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/logs/${secret}`), streamResult)
            .catch((err: Error) => {
                throw err;
            });
    };

    /**
     * Returns all stream execution logs for a given space.
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @returns all stream execution logs for a given space
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
     * Returns all stream execution logs for a given stream.
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamId ID of the stream
     * @returns all stream execution logs for a given stream
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
     * Get a stream execution log by its ID.
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param streamLogId ID of the stream
     * @returns stream execution log
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
