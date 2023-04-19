import { AxiosInstance } from "axios";
import base, { Options } from "../../base";

export class High5AppInternal extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * deleteAllAppsOfOrganization deletes all apps of an organization
     * @param orgName the organizations's name
     */
    public deleteAllAppsOfOrganization = async (orgName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
