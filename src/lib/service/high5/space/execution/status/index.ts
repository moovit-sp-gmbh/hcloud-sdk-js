import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { High5ExecutionStatus } from "../../../../../interfaces/high5/space/execution";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";

export class High5SpaceExecutionStates extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves all stream execution logs for a given stream.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param streamStatusId ID of the stream status
     * @returns Object containing an array of Stream execution logs as well as the total number of results
     */
    public getStreamExecutionStatus = async (
        orgName: string,
        spaceName: string,
        streamStatusId: string,
        limit = 25,
        page = 0
    ): Promise<PaginatedResponse<High5ExecutionStatus>> => {
        const resp = await this.axios.get<High5ExecutionStatus[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execution/streams/status/${streamStatusId}?page=${page}&limit=${limit}`)
        );

        return createPaginatedResponse(resp) as PaginatedResponse<High5ExecutionStatus>;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
