import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { High5Space } from "../../../../interfaces/high5";

export class High5SpaceInternal extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
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
     * Update High5 Space avatar URL.
     * This is an internal endpoint.
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the High5 Space
     * @param avatarUrl URL of the new avatar
     * @returns the High5 Space details
     */
    public updateSpaceAvatar = async (orgName: string, spaceName: string, avatarUrl: string): Promise<High5Space> => {
        const res = await this.axios.patch<High5Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/avatar`), { url: avatarUrl });

        return res.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
