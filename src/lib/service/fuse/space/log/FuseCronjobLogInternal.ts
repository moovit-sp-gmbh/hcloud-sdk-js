import { AxiosInstance } from "axios";
import base, { Options } from "../../../../base";
import { CronjobLogCreation, CronjobLogDto } from "../../../../interfaces/fuse/Cronjob";

export class FuseCronjobLogInternal extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * createCronjobLog returns the newly created cronjobLogDto
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param createCronjob the cronjob to create
     * @returns CronjobLogDto
     */
    public createCronjobLog = async (orgName: string, spaceName: string, cronjobId: string, log: CronjobLogCreation): Promise<CronjobLogDto> => {
        const resp = await this.axios
            .post<CronjobLogDto>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs}`), log)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
