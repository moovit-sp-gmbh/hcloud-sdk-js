import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { FuseCronjobInternal } from "./app/FuseCronjobInternal";

export class FuseAppInternal extends base {
    public cronjob: FuseCronjobInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjob = new FuseCronjobInternal(this.options, this.axios);
    }

    /**
     * deleteAllAppsOfOrganization deletes all apps of an organization by its name
     * @param orgName the organizations's name
     */
    public deleteAllAppsOfOrganization = async (orgName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
