import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliOAuthApp extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * createAvatar returns the newly created avatar as URL
     * @param {string} orgName the name of the organization
     * @param {string} appId the ID of the OAuth application
     * @returns {AvatarCreated} public url to the created avatar
     */
    public createAvatar = async (orgName: string, appId: string): Promise<AvatarCreated> => {
        const resp = await this.axios
            .post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/applications/oauth/${appId}`), {})
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteAvatar deletes the avatar for specified OAuth application
     * @param {string} orgName the name of the organization
     * @param {string} appId the ID of the OAuth application
     * @returns nothing after successful deletion
     */
    public deleteAvatar = async (orgName: string, appId: string): Promise<void> => {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/applications/oauth/${appId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * updateAvatar returns the uploaded and processed avatar as URL
     * @param {string} orgName the name of the organization
     * @param {string} appId the ID of the OAuth application
     * @param {string} file the image as file
     * @returns {AvatarCreated} AvatarCreated
     */
    public updateAvatar = async (orgName: string, appId: string, file: File): Promise<AvatarCreated> => {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios
            .put<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/applications/oauth/${appId}`), data, {
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
