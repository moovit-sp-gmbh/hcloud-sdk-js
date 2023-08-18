import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { FuseCronjobInternal } from "./cronjob";

export class FuseSpaceInternal extends Base {
    public cronjob: FuseCronjobInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjob = new FuseCronjobInternal(this.options, this.axios);
    }

    /**
     * deleteAllSpacesOfOrganization deletes all spaces of an organization by its name
     * @param orgName the organizations's name
     */
    public deleteAllSpacesOfOrganization = async (orgName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * removeUserFromAllSpacesOfOrganization deletes the user from all spaces of an organization
     * @param orgName the organizations's name
     * @param userId the user's id
     */
    public removeUserFromAllSpacesOfOrganization = async (orgName: string, userId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/user/${userId}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
