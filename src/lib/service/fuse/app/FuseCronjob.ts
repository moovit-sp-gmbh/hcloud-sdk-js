import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { CreateCronjob, Cronjob } from "../../../interfaces/Fuse";
import { Event } from "../../../interfaces/High5";
import { FuseCronjobLog } from "./log/FuseCronjobLog";

export class FuseCronjob extends base {
    public cronjobLog: FuseCronjobLog;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjobLog = new FuseCronjobLog(this.options, this.axios);
    }

    /**
     * getCronjobs returns all cronjobs for an app
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns Cronjob array
     */
    public getCronjobs = async (orgName: string, appName: string, limit?: number, page?: number): Promise<Cronjob[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<Cronjob[]>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getCronjobById returns a cronjob by it's ID
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param cronjobId the cronjob's ID
     * @returns Cronjob
     */
    public getCronjobById = async (orgName: string, appName: string, cronjobId: string): Promise<Cronjob> => {
        const resp = await this.axios.get<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * getNextCronjobExecutionsById returns an array of the next n cronjob executions as UTC timestamps
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param cronjobId the cronjob's ID
     * @returns Unix timestamp number array
     */
    public getNextCronjobExecutionsById = async (orgName: string, appName: string, cronjobId: string): Promise<number[]> => {
        const resp = await this.axios
            .get<number[]>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}/next`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createCronjob returns the newly created cronjob
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param createCronjob the cronjob to create
     * @returns Cronjob
     */
    public createCronjob = async (orgName: string, appName: string, createCronjob: CreateCronjob): Promise<Cronjob> => {
        const resp = await this.axios.post<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs`), createCronjob).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * updateCronjob returns the updated cronjob
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param createCronjob the cronjob to update
     * @returns Cronjob
     */
    public updateCronjob = async (orgName: string, appName: string, cronjobId: string, createCronjob: CreateCronjob): Promise<Cronjob> => {
        const resp = await this.axios
            .put<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}`), createCronjob)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * patchCronjobExpression returns the patched cronjob
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param updateCronjob the cronjob to update
     * @returns Cronjob
     */
    public patchCronjobExpression = async (orgName: string, appName: string, cronjobId: string, expression: string): Promise<Cronjob> => {
        const resp = await this.axios
            .patch<Cronjob>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}/expression`), { expression: expression })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteEventByName delete an event by it's name
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param cronjobId the event's name
     */
    public deleteCronjobById = async (orgName: string, appName: string, cronjobId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
