import base from "../../../../base";
import { CronjobLogCreation, CronjobLogDto } from "../../../../interfaces/Fuse";

export class FuseCronjobLogInternal extends base {
    /**
     * createCronjobLog returns the newly created cronjobLogDto
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param createCronjob the cronjob to create
     * @returns CronjobLogDto
     */
    public createCronjobLog = async (orgName: string, appName: string, cronjobId: string, log: CronjobLogCreation): Promise<CronjobLogDto> => {
        const resp = await this.axios
            .post<CronjobLogDto>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/jobs/${cronjobId}/logs}`), log)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
