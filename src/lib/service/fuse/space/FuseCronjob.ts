import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import { CreateCronjob, Cronjob } from "../../../interfaces/Fuse";
import { SearchFilter, Sorting } from "../../../interfaces/Global";
import { FuseCronjobLog } from "./log/FuseCronjobLog";
import { FuseCronjobLogInternal } from "./log/FuseCronjobLogInternal";

export class FuseCronjob extends base {
    public cronjobLog: FuseCronjobLog;
    public cronjobLogInternal: FuseCronjobLogInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjobLog = new FuseCronjobLog(this.options, this.axios);
        this.cronjobLogInternal = new FuseCronjobLogInternal(this.options, this.axios);
    }

    /**
     * getCronjobById returns a cronjob by it's ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param cronjobId the cronjob's ID
     * @returns Cronjob
     */
    public getCronjobById = async (orgName: string, spaceName: string, cronjobId: string): Promise<Cronjob> => {
        const resp = await this.axios
            .get<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getNextCronjobExecutionsById returns an array of the next n cronjob executions as UTC timestamps
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param cronjobId the cronjob's ID
     * @returns Unix timestamp number array
     */
    public getNextCronjobExecutionsById = async (orgName: string, spaceName: string, cronjobId: string): Promise<number[]> => {
        const resp = await this.axios
            .get<number[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/next`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createCronjob returns the newly created cronjob
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param createCronjob the cronjob to create
     * @returns Cronjob
     */
    public createCronjob = async (orgName: string, spaceName: string, createCronjob: CreateCronjob): Promise<Cronjob> => {
        const resp = await this.axios
            .post<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs`), createCronjob)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * updateCronjob returns the updated cronjob
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param createCronjob the cronjob to update
     * @returns Cronjob
     */
    public updateCronjob = async (orgName: string, spaceName: string, cronjobId: string, createCronjob: CreateCronjob): Promise<Cronjob> => {
        const resp = await this.axios
            .put<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}`), createCronjob)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * patchCronjobExpression returns the patched cronjob
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param updateCronjob the cronjob to update
     * @returns Cronjob
     */
    public patchCronjobExpression = async (orgName: string, spaceName: string, cronjobId: string, expression: string): Promise<Cronjob> => {
        const resp = await this.axios
            .patch<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/expression`), { expression: expression })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteEventByName delete an event by it's name
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param cronjobId the event's name
     */
    public deleteCronjobById = async (orgName: string, spaceName: string, cronjobId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * searchCronjobs search for jobs of a space
     * @param orgName the organizations's name
     * @param spaceName the space's name
     * @param [searchFilter] the search filter to be used
     * @param [limit] page size
     * @param [page] page number
     * @returns filtered cronjobs list
     */
    public searchCronjobs = async <TFilter extends SearchFilter>(
        orgName: string,
        spaceName: string,
        filters?: TFilter[],
        sorting?: Sorting,
        limit = 25,
        page = 0
    ): Promise<[Cronjob[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios
            .post<Cronjob[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/search?limit=${limit}&page=${page}`), {
                filters: filtersDTO,
                sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
