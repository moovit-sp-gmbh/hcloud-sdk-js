import Base from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { CronjobLogDto } from "../../../../../interfaces/fuse/space/cronjob/CronjobLog";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";

export class FuseCronjobLog extends Base {
    /**
     * Retrieves all cronjobs of a Fuse space which match the provided search filter(s). Will return all cronjobs if no filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of filtered cronjob logs as well as the total number of results found in the database (independent of limit and page)
     */
    async searchCronjobLogs({
        orgName,
        spaceName,
        cronjobId,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string; cronjobId: string }): Promise<PaginatedResponse<CronjobLogDto>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<CronjobLogDto[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<CronjobLogDto>;
    }

    /**
     * Retrieves a cronjob log by it's ID
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param cronjobLogId ID of the cronjob log
     * @returns the cronjob log
     */
    async getCronjobLog(orgName: string, spaceName: string, cronjobId: string, cronjobLogId: string): Promise<CronjobLogDto> {
        const resp = await this.axios.get<CronjobLogDto>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs/${cronjobLogId}`)
        );

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
