import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { AvatarCreated } from "../../../interfaces/Dali";

export class DaliFuse extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * createAvatar returns the newly created avatar as URL
     * @param {string} orgName the name of the organization
     * @param {string} spaceName the name of the space
     * @returns {AvatarCreated} public url to the created avatar
     */
    public createAvatar = async (orgName: string, spaceName: string): Promise<AvatarCreated> => {
        const resp = await this.axios
            .post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/fuse/${spaceName}`), {})
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteAvatar deletes the avatar for specified space
     * @param {string} orgName the name of the organization
     * @param {string} spaceName the name of the space
     * @returns nothing after successful deletion
     */
    public deleteAvatar = async (orgName: string, spaceName: string): Promise<void> => {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/fuse/${spaceName}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
