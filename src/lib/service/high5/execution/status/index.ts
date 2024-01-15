import Base from "../../../../Base";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { SearchFilter, SearchParams } from "../../../../interfaces/global/SearchFilters";
import { High5ExecutionStatus } from "../../../../interfaces/high5/space/execution";

export class High5OrganizationExecutionStates extends Base {
    /**
     * Retrieves all stream execution logs for a given execution inside an organization.
     * @param orgName Name of the Organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Stream execution logs as well as the total number of results
     */
    public searchExecutionStates = async ({
        orgName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string }): Promise<[High5ExecutionStatus[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));
        const resp = await this.axios
            .post<High5ExecutionStatus[]>(this.getEndpoint(`/v1/org/${orgName}/execution/status/search?page=${page}&limit=${limit}`), {
                filters: filtersDTO,
                sorting: sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
