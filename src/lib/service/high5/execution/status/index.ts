import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { SearchFilter, SearchParams } from "../../../../interfaces/global";
import {
    High5ExecutionStatus,
    High5ExecutionStatusFullSearchResponse,
    High5ExecutionStatusSearchResponse,
} from "../../../../interfaces/high5/space/execution";

export class High5OrganizationExecutionStates extends Base {
    /**
     * Retrieves the stream execution states of an organization.
     *
     * Besides the fields of the execution state, filters can target the payload of the execution:
     * - `payload.<path>` filters JSON payloads by the value at the given property path, e.g. `payload.user.id`.
     *   `is` matches the exact value (numbers and booleans keep their type), `starts with` is case-sensitive, `contains` and `ends with` are case-insensitive.
     * - `payload` with `contains` is a case-insensitive text search over all string values of the payload. A single word only matches
     *   whole words, values with separators are searched as phrase. Only the newest 10000 matching executions are considered,
     *   use {@link fullSearchExecutionStates} to consider all of them.
     *
     * When filtering by payload, each state contains the `payload` of its execution and the total is capped at 1000 (see `totalCapped`).
     * @param orgName Name of the Organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Stream execution states, the total number of results and whether the total is capped
     */
    async searchExecutionStates<R extends boolean = false>(
        { orgName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, High5ExecutionStatusSearchResponse>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));
        const resp = await this.axios.post<High5ExecutionStatus[]>(
            this.getEndpoint(`/v1/org/${orgName}/execution/status/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        const data: High5ExecutionStatusSearchResponse = { ...createPaginatedResponse(resp), totalCapped: resp.headers["total-capped"] === "true" };
        return (raw?.raw ? { ...resp, data } : data) as MaybeRaw<R, High5ExecutionStatusSearchResponse>;
    }

    /**
     * Retrieves the stream execution states of an organization by payload, considering all executions without limits.
     * The count is skipped, so instead of a total the response tells whether a next page exists. Takes the same filters as
     * {@link searchExecutionStates}, but can take considerably longer for payload filters matching many executions.
     * Searches without payload filters behave like {@link searchExecutionStates}.
     * @param orgName Name of the Organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Stream execution states and whether a next page exists
     */
    async fullSearchExecutionStates<R extends boolean = false>(
        { orgName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, High5ExecutionStatusFullSearchResponse>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));
        const resp = await this.axios.post<High5ExecutionStatus[]>(
            this.getEndpoint(`/v1/org/${orgName}/execution/status/search?page=${page}&limit=${limit}&fullSearch=true`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        // searches without payload filters are not full searches and report a total instead
        const hasMoreHeader = resp.headers["has-more"];
        const hasMore = hasMoreHeader !== undefined ? hasMoreHeader === "true" : (page + 1) * limit < parseInt(String(resp.headers["total"]), 10);
        const data: High5ExecutionStatusFullSearchResponse = { items: resp.data, hasMore };
        return (raw?.raw ? { ...resp, data } : data) as MaybeRaw<R, High5ExecutionStatusFullSearchResponse>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
