import { AxiosInstance } from "axios";
import base, { Options } from "../../../../base";
import { StreamLog, StreamResult } from "../../../../interfaces/High5";

export class High5ExecuteLog extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieve the Stream execution logs of an Space
     * @param orgName the name of the organization
     * @param spaceName the name of the space
     * @param finished Fetch finished or unfinished logs.
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns all the execution logs associated with the specified space filtered given the parameters.
     */
    public getSpaceLogs = async (orgName: string, spaceName: string, finished = true, limit = 25, page = 0): Promise<[StreamLog[], number]> => {
        const resp = await this.axios
            .get<StreamLog[]>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/logs?finished=${finished}&limit=${limit}&page=${page}`)
            )
            .catch((err: Error) => {
                throw err;
            });
        return [resp.data, parseInt(String(resp.headers["total"]), 0)];
    };

    /**
     * Retrieves the Stream execution logs of a stream by its ID
     * @param orgName the name of the organization
     * @param spaceName the name of the space
     * @param streamId the ID of the stream
     * @param finished Fetch finished or unfinished logs.
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns all the execution logs associated with the specified stream
     */
    public getStreamLogs = async (
        orgName: string,
        spaceName: string,
        streamId: string,
        finished = true,
        limit = 25,
        page = 0
    ): Promise<[StreamLog[], number]> => {
        const resp = await this.axios
            .get<StreamLog[]>(
                this.getEndpoint(
                    `/v1/org/${orgName}/spaces/${spaceName}/execute/logs/streams/${streamId}?finished=${finished}&limit=${limit}&page=${page}`
                )
            )
            .catch((err: Error) => {
                throw err;
            });
        return [resp.data, parseInt(String(resp.headers["total"]), 0)];
    };

    /**
     * Retrieves a Stream execution log by its ID
     * @param orgName the name of the organization
     * @param spaceName the name of the space
     * @param logId the ID of the execution log
     * @returns the execution log
     */
    public getStreamLog = async (orgName: string, spaceName: string, logId: string): Promise<StreamLog> => {
        const resp = await this.axios
            .get<StreamLog>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/logs/${logId}`))
            .catch((err: Error) => {
                throw err;
            });
        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
