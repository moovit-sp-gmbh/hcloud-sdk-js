import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { CronjobType, Job, JobCreate } from "../../../../interfaces/high5/space/job";
import { High5JobLogInternal } from "../../internal/space/job/log";
import { High5JobLog } from "./log";

export class High5Job extends Base {
    public get jobLog(): High5JobLog {
        if (this._jobLog === undefined) {
            this._jobLog = new High5JobLog(this.options, this.axios);
        }
        return this._jobLog;
    }
    private _jobLog?: High5JobLog;

    public get jobLogInternal(): High5JobLogInternal {
        if (this._jobLogInternal === undefined) {
            this._jobLogInternal = new High5JobLogInternal(this.options, this.axios);
        }
        return this._jobLogInternal;
    }
    private _jobLogInternal?: High5JobLogInternal;

    /**
     * Retrieves a cronjob by it's ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the High5 space
     * @param jobId ID of the cronjob
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The requested cronjob
     */
    async getJob<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        jobId: string,
        exposeNextExecution = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Job>> {
        const resp = await this.axios.get<Job>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}?nextExecution=${exposeNextExecution}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Job>;
    }

    /**
     * Retrieves the next n cronjob executions as Unix timestamps (in milliseconds).
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     * @returns Array of Unix timestamps
     */
    async getNextCronjobExecutions<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        jobId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, number[]>> {
        const resp = await this.axios.get<number[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}/next`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, number[]>;
    }

    /**
     * Creates a new cronjob in the specified High5 space.
     * @param orgName Name of the organisation
     * @param spaceName Name of the High5 space
     * @param createJob Cronjob to be created
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns Created cronjob
     */
    async createJob<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        createJob: JobCreate,
        exposeNextExecution = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Job>> {
        const resp = await this.axios.post<Job>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs?nextExecution=${exposeNextExecution}`),
            createJob
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Job>;
    }

    /**
     * Updates an existing cronjob.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     * @param createJob Cronjob to be updated
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns Updated cronjob
     */
    async updateJob<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        jobId: string,
        createJob: JobCreate,
        exposeNextExecution = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Job>> {
        const resp = await this.axios.put<Job>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}?nextExecution=${exposeNextExecution}`),
            createJob
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Job>;
    }

    /**
     * Change the cron expression of an existing cronjob
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     * @param expression New cron expression
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @param time (optional) Schedule selection preset used on frontend
     * @returns The patched cronjob
     */
    async patchCronjobExpression<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        jobId: string,
        expression: string,
        exposeNextExecution = false,
        time?: CronjobType,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Job>> {
        const resp = await this.axios.patch<Job>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}/expression?nextExecution=${exposeNextExecution}`),
            { expression, time }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Job>;
    }

    /**
     * Change the enabled flag of an existing cronjob
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     * @param enabled Boolean flag to set
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The patched cronjob
     */
    async patchCronjobEnabled<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        jobId: string,
        enabled: boolean,
        exposeNextExecution = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Job>> {
        const resp = await this.axios.patch<Job>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}/enabled?nextExecution=${exposeNextExecution}`),
            { enabled }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Job>;
    }

    /**
     * Enable a cronjob.
     *
     * This is a wrapper around patchCronjobEnabled.
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The patched cronjob
     */
    public enableCronjob<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        jobId: string,
        exposeNextExecution = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Job>> {
        return this.patchCronjobEnabled(orgName, spaceName, jobId, true, exposeNextExecution, raw);
    }

    /**
     * Disable a cronjob.
     *
     * This is a wrapper around patchCronjobEnabled.
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the response object
     * @returns The patched cronjob
     */
    public disableCronjob<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        jobId: string,
        exposeNextExecution = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Job>> {
        return this.patchCronjobEnabled(orgName, spaceName, jobId, false, exposeNextExecution, raw);
    }

    /**
     * Deletes a cronjob by its ID
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param jobId ID of the cronjob
     */
    async deleteJob<R extends boolean = false>(orgName: string, spaceName: string, jobId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Retrieves all cronjobs of a High5 space which match the provided search filter(s). Will return all cronjobs if no filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @param exposeNextExecution (optional) Show the next execution as a Unix timestamp (in milliseconds) in the returned cronjob objects
     * @returns Object containing an array of filtered cronjobs as well as the total number of results found in the database (independent of limit and page)
     */
    async searchJobs<R extends boolean = false>(
        {
            orgName,
            spaceName,
            filters,
            sorting,
            limit = 25,
            page = 0,
            exposeNextExecution = false,
        }: SearchParams & { orgName: string; spaceName: string; exposeNextExecution?: boolean },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Job>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<Job[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/search?limit=${limit}&page=${page}&nextExecution=${exposeNextExecution}`),
            {
                filters: filtersDTO,
                sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<R, PaginatedResponse<Job>>;
    }

    /**
     * Resolve a cron pattern along with a timezone to get the next executions in mili-seconds.
     * @param expression The cron expression
     * @param timezone The target IANA timezone
     * @param amount The amount of returned execution-dates (limited between 1 and 10, default is 3)
     * @returns Array of Unix timestamps
     */
    async resolveCronPatternWithTimezone<R extends boolean = false>(
        expression: string,
        timezone: string,
        amount = 3,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, number[]>> {
        const resp = await this.axios.post<number[]>(this.getEndpoint(`/v1/cron/resolve`), {
            expression: expression,
            timezone: timezone,
            amount: amount,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, number[]>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
