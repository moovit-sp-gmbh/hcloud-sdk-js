import base from "../../../../base";

export class FuseCronjobLog extends base {
    /**
     * getAllCronjobLogs returns all logs for a cronjob
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param cronjobId the cronjob's ID
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns CronjobLog array
     */
    public getAllCronjobLogs = async (
        orgName: string,
        spaceName: string,
        cronjobId: string,
        limit?: number,
        page?: number
    ): Promise<FuseCronjobLog[]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios
            .get<FuseCronjobLog[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getCronjobLog returns a cronjob log by it's ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param cronjobId the cronjob's ID
     * @returns CronjobLog
     */
    public getCronjobLog = async (orgName: string, spaceName: string, cronjobId: string, cronjobLogId: string): Promise<FuseCronjobLog> => {
        const resp = await this.axios
            .get<FuseCronjobLog>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs/${cronjobLogId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
