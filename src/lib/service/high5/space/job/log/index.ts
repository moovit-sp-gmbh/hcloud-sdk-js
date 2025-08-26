import Base from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { JobLogDto } from "../../../../../interfaces/high5/space/job/JobLog";

export class High5JobLog extends Base {
    /**
     * Retrieves all cronjobs of a High5 space which match the provided search filter(s). Will return all cronjobs if no filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of filtered cronjob logs as well as the total number of results found in the database (independent of limit and page)
     */
    async searchJobLogs({
        orgName,
        spaceName,
        jobId,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string; jobId: string }): Promise<PaginatedResponse<JobLogDto>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<JobLogDto[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}/logs/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<JobLogDto>;
    }

    /**
     * Retrieves a cronjob log by it's ID
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     * @param jobLogId ID of the cronjob log
     * @returns the cronjob log
     */
    async getJobLog(orgName: string, spaceName: string, jobId: string, jobLogId: string): Promise<JobLogDto> {
        const resp = await this.axios.get<JobLogDto>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}/logs/${jobLogId}`));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
