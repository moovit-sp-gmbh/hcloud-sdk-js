import Base from "../../../../Base";
import { FuseCronjobInternal } from "./cronjob";

export class FuseSpaceInternal extends Base {
    public get cronjob(): FuseCronjobInternal {
        if (this._cronjob === undefined) {
            this._cronjob = new FuseCronjobInternal(this.options, this.axios);
        }
        return this._cronjob;
    }
    private _cronjob?: FuseCronjobInternal;

    /**
     * Deletes all spaces of an organization.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgName Name of the organization
     */
    async deleteAllSpacesOfOrganization(orgName: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`));
    }

    /**
     * Removes the user from all spaces of an organization.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgName Name of the organization
     * @param userId ID of the user
     */
    async removeUserFromAllSpacesOfOrganization(orgName: string, userId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/user/${userId}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
