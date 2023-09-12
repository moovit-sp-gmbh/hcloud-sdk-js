import Base from "../../../../../Base";
import { CronjobLogDto } from "../../../../../interfaces/fuse/space/cronjob/CronjobLog";

export class FuseCronjobLog extends Base {
    /**
     * Retrieves all logs of a cronjob.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns an Array of cronjob logs and the total number of results found in the database (independent of limit and page)
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

        const resp = await this.axios.get<CronjobLogDto[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs?page=${page}&limit=${limit}`)
        );

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves a cronjob log by it's ID
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param cronjobId ID of the cronjob
     * @param cronjobLogId ID of the cronjob log
     * @returns the cronjob log
     */
    public getCronjobLog = async (orgName: string, spaceName: string, cronjobId: string, cronjobLogId: string): Promise<CronjobLogDto> => {
        const resp = await this.axios.get<CronjobLogDto>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs/${cronjobLogId}`)
        );

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
