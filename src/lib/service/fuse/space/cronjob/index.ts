import Base from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { Cronjob, CronjobCreate } from "../../../../interfaces/fuse/space/cronjob/Cronjob";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { FuseCronjobLogInternal } from "../../internal/space/cronjob/log";
import { FuseCronjobLog } from "./log";

export class FuseCronjob extends Base {
    public get cronjobLog(): FuseCronjobLog {
        if (this._cronjobLog === undefined) {
            this._cronjobLog = new FuseCronjobLog(this.options, this.axios);
        }
        return this._cronjobLog;
    }
    private _cronjobLog?: FuseCronjobLog;
    public get cronjobLogInternal(): FuseCronjobLogInternal {
        if (this._cronjobLogInternal === undefined) {
            this._cronjobLogInternal = new FuseCronjobLogInternal(this.options, this.axios);
        }
        return this._cronjobLogInternal;
    }
    private _cronjobLogInternal?: FuseCronjobLogInternal;

    /**
     * Retrieves a cronjob by it's ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the Fuse space
     * @param cronjobId ID of the cronjob
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The requested cronjob
     */
    async getCronjob(orgName: string, spaceName: string, cronjobId: string, exposeNextExecution = false): Promise<Cronjob> {
        const resp = await this.axios.get<Cronjob>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}?nextExecution=${exposeNextExecution}`)
        );

        return resp.data;
    }

    /**
     * Retrieves the next n cronjob executions as Unix timestamps (in milliseconds).
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @returns Array of Unix timestamps
     */
    async getNextCronjobExecutions(orgName: string, spaceName: string, cronjobId: string): Promise<number[]> {
        const resp = await this.axios.get<number[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/next`));

        return resp.data;
    }

    /**
     * Creates a new cronjob in the specified Fuse space.
     * @param orgName Name of the organisation
     * @param spaceName Name of the Fuse space
     * @param createCronjob Cronjob to be created
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns Created cronjob
     */
    async createCronjob(orgName: string, spaceName: string, createCronjob: CronjobCreate, exposeNextExecution = false): Promise<Cronjob> {
        const resp = await this.axios.post<Cronjob>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs?nextExecution=${exposeNextExecution}`),
            createCronjob
        );

        return resp.data;
    }

    /**
     * Updates an existing cronjob.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param createCronjob Cronjob to be updated
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns Updated cronjob
     */
    async updateCronjob(
        orgName: string,
        spaceName: string,
        cronjobId: string,
        createCronjob: CronjobCreate,
        exposeNextExecution = false
    ): Promise<Cronjob> {
        const resp = await this.axios.put<Cronjob>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}?nextExecution=${exposeNextExecution}`),
            createCronjob
        );

        return resp.data;
    }

    /**
     * Change the cron expression of an existing cronjob
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param expression New cron expression
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The patched cronjob
     */
    async patchCronjobExpression(
        orgName: string,
        spaceName: string,
        cronjobId: string,
        expression: string,
        exposeNextExecution = false
    ): Promise<Cronjob> {
        const resp = await this.axios.patch<Cronjob>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/expression?nextExecution=${exposeNextExecution}`),
            { expression: expression }
        );

        return resp.data;
    }

    /**
     * Change the enabled flag of an existing cronjob
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param enabled Boolean flag to set
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The patched cronjob
     */
    async patchCronjobEnabled(
        orgName: string,
        spaceName: string,
        cronjobId: string,
        enabled: boolean,
        exposeNextExecution = false
    ): Promise<Cronjob> {
        const resp = await this.axios.patch<Cronjob>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/enabled?nextExecution=${exposeNextExecution}`),
            { enabled }
        );

        return resp.data;
    }

    /**
     * Enable a cronjob.
     *
     * This is a wrapper around patchCronjobEnabled.
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The patched cronjob
     */
    public enableCronjob = (orgName: string, spaceName: string, cronjobId: string, exposeNextExecution = false): Promise<Cronjob> => {
        return this.patchCronjobEnabled(orgName, spaceName, cronjobId, true, exposeNextExecution);
    };

    /**
     * Disable a cronjob.
     *
     * This is a wrapper around patchCronjobEnabled.
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The patched cronjob
     */
    public disableCronjob = (orgName: string, spaceName: string, cronjobId: string, exposeNextExecution = false): Promise<Cronjob> => {
        return this.patchCronjobEnabled(orgName, spaceName, cronjobId, false, exposeNextExecution);
    };

    /**
     * Deletes a cronjob by its ID
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     */
    async deleteCronjob(orgName: string, spaceName: string, cronjobId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}`));
    }

    /**
     * Retrieves all cronjobs of a Fuse space which match the provided search filter(s). Will return all cronjobs if no filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the returned cronjob objects
     * @returns Object containing an array of filtered cronjobs as well as the total number of results found in the database (independent of limit and page)
     */
    async searchCronjobs({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
        exposeNextExecution = false,
    }: SearchParams & { orgName: string; spaceName: string; exposeNextExecution?: boolean }): Promise<PaginatedResponse<Cronjob>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<Cronjob[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/search?limit=${limit}&page=${page}&nextExecution=${exposeNextExecution}`),
            {
                filters: filtersDTO,
                sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<Cronjob>;
    }

    /**
     * Resolve a cron pattern along with a timezone to get the next executions in mili-seconds.
     * @param expression The cron expression
     * @param timezone The target IANA timezone
     * @param amount The amount of returned execution-dates (limited between 1 and 10, default is 3)
     * @returns Array of Unix timestamps
     */
    async resolveCronPatternWithTimezone(expression: string, timezone: string, amount = 3): Promise<number[]> {
        const resp = await this.axios.post<number[]>(this.getEndpoint(`/v1/cron/resolve`), {
            expression: expression,
            timezone: timezone,
            amount: amount,
        });

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
