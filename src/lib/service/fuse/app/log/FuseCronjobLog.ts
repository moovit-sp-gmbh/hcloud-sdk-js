import base from "../../../../base";
import { EventExecutionRequest, StreamExecutionPackage, StreamExecutionRequest, StreamLog, StreamResult } from "../../../../interfaces/High5";

export class FuseCronjobLog extends base {

    /**
     * getCronjobLogs returns all logs for a cronjob
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param cronjobId the cronjob's ID
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns CronjobLog array
     */
    public getCronjobLogs = async (orgName: string, appName: string, cronjobId: string, limit?: number, page?: number): Promise<FuseCronjobLog[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<FuseCronjobLog[]>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}/logs?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getCronjobLogById returns a cronjob log by it's ID
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param cronjobId the cronjob's ID
     * @returns CronjobLog
     */
    public getCronjobLogById = async (orgName: string, appName: string, cronjobId: string, cronjobLogId: string): Promise<FuseCronjobLog> => {
        const resp = await this.axios.get<FuseCronjobLog>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}/logs/${cronjobLogId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createCronjobLog returns the newly created cronjobLog
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param createCronjob the cronjob to create
     * @returns CronjobLog
     */
    public createCronjobLog = async (orgName: string, appName: string, cronjobId: string, log: string): Promise<FuseCronjobLog> => {
        const resp = await this.axios.post<FuseCronjobLog>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}/logs}`), {log: log}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteCronjobLogById delete a cronjob log by its ID
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param cronjobId the event's name
     */
    public deleteCronjobLogById = async (orgName: string, appName: string, cronjobId: string, cronjobLogId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}/logs/${cronjobLogId}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
