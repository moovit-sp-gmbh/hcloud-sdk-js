import base from "../../../../base";

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
        const resp = await this.axios
            .get<FuseCronjobLog>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}/logs/${cronjobLogId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
