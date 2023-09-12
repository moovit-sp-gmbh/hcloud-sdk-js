import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliOAuthApp extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Creates a default avatar for the specified OAuth app.
     * @param orgName Name of the organization
     * @param appId ID of the OAuth app
     * @returns Public URL of the created avatar
     */
    public createAvatar = async (orgName: string, appId: string): Promise<AvatarCreated> => {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/applications/oauth/${appId}`), {});

        return resp.data;
    };

    /**
     * Deletes the avatar of the OAuth app from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param appId ID of the OAuth app
     */
    public deleteAvatar = async (orgName: string, appId: string): Promise<void> => {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/applications/oauth/${appId}`));
    };

    /**
     * Updates the avatar of the specified OAuth app.
     * @param orgName Name of the organization
     * @param appId ID of the OAuth app
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    public updateAvatar = async (orgName: string, appId: string, file: File): Promise<AvatarCreated> => {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.put<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/applications/oauth/${appId}`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
