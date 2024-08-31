import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { FuseSpace } from "../../../../interfaces/fuse";
import { FuseCronjobInternal } from "./cronjob";

export class FuseSpaceInternal extends Base {
    public cronjob: FuseCronjobInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjob = new FuseCronjobInternal(this.options, this.axios);
    }

    /**
     * Deletes all spaces of an organization.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgName Name of the organization
     */
    public deleteAllSpacesOfOrganization = async (orgName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`));
    };

    /**
     * Removes the user from all spaces of an organization.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgName Name of the organization
     * @param userId ID of the user
     */
    public removeUserFromAllSpacesOfOrganization = async (orgName: string, userId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/user/${userId}`));
    };

    /**
     * Update Fuse Space avatar URL.
     * This is an internal endpoint.
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the Fuse Space
     * @param avatarUrl URL of the new avatar
     * @returns the Fuse Space details
     */
    public updateSpaceAvatar = async (orgName: string, spaceName: string, avatarUrl: string): Promise<FuseSpace> => {
        const res = await this.axios.patch<FuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/avatar`), { url: avatarUrl });

        return res.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
