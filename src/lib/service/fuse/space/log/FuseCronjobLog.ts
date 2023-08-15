import base from "../../../../base";
import { CronjobLogDto } from "../../../../interfaces/Fuse";

export class FuseCronjobLog extends base {
    /**
     * Returns all logs for a cronjob
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param cronjobId the cronjob's ID
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns Array consisting of an array of cronjob logs and the total number of results
     */
    public getAllCronjobLogs = async (
        orgName: string,
        spaceName: string,
        cronjobId: string,
        limit?: number,
        page?: number
    ): Promise<[CronjobLogDto[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios
            .get<CronjobLogDto[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getCronjobLog returns a cronjob log by it's ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param cronjobId the cronjob's ID
     * @returns CronjobLog
     */
    public getCronjobLog = async (orgName: string, spaceName: string, cronjobId: string, cronjobLogId: string): Promise<CronjobLogDto> => {
        const resp = await this.axios
            .get<CronjobLogDto>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs/${cronjobLogId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
