import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { AvatarCreated } from "../../../interfaces/dali/Avatar";

export class DaliOrganization extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * createAvatar returns the newly created avatar as URL
     * @param {string} orgName the organizations's name
     * @returns {AvatarCreated} AvatarCreated
     */
    public createAvatar = async (orgName: string): Promise<AvatarCreated> => {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}`), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteAvatar deletes the avatar for specified organization
     * @param {string} orgName the name of the organization
     * @returns nothing after successful deletion
     */
    public deleteAvatar = async (orgName: string): Promise<void> => {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * updateAvatar returns the uploaded and processed avatar as URL
     * @param {string} orgName the organizations's name
     * @param {string} file the image as file
     * @returns {AvatarCreated} AvatarCreated
     */
    public updateAvatar = async (orgName: string, file: File): Promise<AvatarCreated> => {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios
            .put<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}`), data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
