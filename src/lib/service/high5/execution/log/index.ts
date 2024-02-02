import Base from "../../../../Base";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { High5ExecutionLog } from "../../../../interfaces/high5/space/execution";

export class High5OrganizationExecutionLogs extends Base {
    /**
     * Retrieves all stream execution logs for a given execution inside an organization.
     * @param orgName Name of the Organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Stream execution logs as well as the total number of results
     */
    public searchExecutionLogs = async ({
        orgName,
        payload = false,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; payload?: boolean }): Promise<PaginatedResponse<High5ExecutionLog>> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));
        const resp = await this.axios.post<High5ExecutionLog[]>(
            this.getEndpoint(`/v1/org/${orgName}/execution/logs/search?page=${page}&limit=${limit}&payload=${payload}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<High5ExecutionLog>;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
