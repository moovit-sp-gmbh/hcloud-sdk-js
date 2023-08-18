import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { CreateCronjob, Cronjob } from "../../../../interfaces/fuse/space/cronjob/Cronjob";
import { SearchFilter, SearchParams } from "../../../../interfaces/global";
import { FuseCronjobLog } from "./log";
import { FuseCronjobLogInternal } from "../../internal/space/cronjob/log";

export class FuseCronjob extends Base {
    public cronjobLog: FuseCronjobLog;
    public cronjobLogInternal: FuseCronjobLogInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjobLog = new FuseCronjobLog(this.options, this.axios);
        this.cronjobLogInternal = new FuseCronjobLogInternal(this.options, this.axios);
    }

    /**
     * getCronjob returns a cronjob by it's ID
     * @param {string} orgName the organizations's name
     * @param {string} spaceName the spaces's name
     * @param {string} cronjobId the cronjob's ID
     * @param {boolean} [exposeNextExecution] - optional parameter to trigger the exposure of the next execution in unix timestamp in the response object(s)
     * @returns Cronjob
     */
    public getCronjob = async (orgName: string, spaceName: string, cronjobId: string, exposeNextExecution = false): Promise<Cronjob> => {
        const resp = await this.axios
            .get<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}?nextExecution=${exposeNextExecution}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getNextCronjobExecutions returns an array of the next n cronjob executions as UTC unix timestamps
     * @param {string} orgName the organizations's name
     * @param {string} spaceName the spaces's name
     * @param {string} cronjobId the cronjob's ID
     * @returns Unix timestamp number array
     */
    public getNextCronjobExecutions = async (orgName: string, spaceName: string, cronjobId: string): Promise<number[]> => {
        const resp = await this.axios
            .get<number[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/next`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createCronjob returns the newly created cronjob
     * @param {string} orgName the organizations's name
     * @param {string} spaceName the spaces's name
     * @param {CreateCronjob} createCronjob the cronjob to create
     * @param {boolean} [exposeNextExecution] - optional parameter to trigger the exposure of the next execution in unix timestamp in the response object(s)
     * @returns Cronjob
     */
    public createCronjob = async (
        orgName: string,
        spaceName: string,
        createCronjob: CreateCronjob,
        exposeNextExecution = false
    ): Promise<Cronjob> => {
        const resp = await this.axios
            .post<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs?nextExecution=${exposeNextExecution}`), createCronjob)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * updateCronjob returns the updated cronjob
     * @param {string} orgName the organizations's name
     * @param {string} spaceName the spaces's name
     * @param {CreateCronjob} createCronjob the cronjob to update
     * @param {boolean} [exposeNextExecution] - optional parameter to trigger the exposure of the next execution in unix timestamp in the response object(s)
     * @returns Cronjob
     */
    public updateCronjob = async (
        orgName: string,
        spaceName: string,
        cronjobId: string,
        createCronjob: CreateCronjob,
        exposeNextExecution = false
    ): Promise<Cronjob> => {
        const resp = await this.axios
            .put<Cronjob>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}?nextExecution=${exposeNextExecution}`),
                createCronjob
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * patchCronjobExpression returns the patched cronjob
     * @param {string} orgName the organizations's name
     * @param {string} spaceName the spaces's name
     * @param {string} cronjobId the cronjob's ID
     * @param {string} expression the new cronjob's expression
     * @param {boolean} [exposeNextExecution] - optional parameter to trigger the exposure of the next execution in unix timestamp in the response object(s)
     * @returns Cronjob
     */
    public patchCronjobExpression = async (
        orgName: string,
        spaceName: string,
        cronjobId: string,
        expression: string,
        exposeNextExecution = false
    ): Promise<Cronjob> => {
        const resp = await this.axios
            .patch<Cronjob>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/expression?nextExecution=${exposeNextExecution}`),
                { expression: expression }
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteEvent delete an event by it's name
     * @param {string} orgName the organizations's name
     * @param {string} spaceName the spaces's name
     * @param {string} cronjobId the cronjob's ID
     */
    public deleteCronjob = async (orgName: string, spaceName: string, cronjobId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * searchCronjobs search for jobs of a space
     * @param {SearchParams & { orgName: string, spaceName: string }} params Search parameters
     * @param {string} params.orgName Name of the organization
     * @param {string} params.spaceName Name of the space
     * @param {SearchFilter[]} [params.filters] an array of search filters
     * @param {Sorting} [params.sorting] an optional sorting direction
     * @param {number} [params.limit=25] an optional response limit limit (1-100; defaults to 25)
     * @param {number} [params.page=0] - an optional page to skip certain results (page * limit; defaults to 0)
     * @param {boolean} [exposeNextExecution] - optional parameter to trigger the exposure of the next execution in unix timestamp in the response object(s)
     * @returns filtered cronjobs list
     */
    public searchCronjobs = async (
        { orgName, spaceName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string; spaceName: string },
        exposeNextExecution = false
    ): Promise<[Cronjob[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios
            .post<Cronjob[]>(
                this.getEndpoint(
                    `/v1/org/${orgName}/spaces/${spaceName}/jobs/search?limit=${limit}&page=${page}&nextExecution=${exposeNextExecution}`
                ),
                {
                    filters: filtersDTO,
                    sorting,
                }
            )
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
