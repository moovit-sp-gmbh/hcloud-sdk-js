import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliHigh5 extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Creates a default avatar for the specified High5 space.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @returns Public URL of the created avatar
     */
    public createAvatar = async (orgName: string, spaceName: string): Promise<AvatarCreated> => {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/high5/${spaceName}`), {});

        return resp.data;
    };

    /**
     * Deletes the avatar of the High5 space from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     */
    public deleteAvatar = async (orgName: string, spaceName: string): Promise<void> => {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/high5/${spaceName}`));
    };

    /**
     * Updates the avatar of the specified High5 space
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    public updateAvatar = async (orgName: string, spaceName: string, file: File): Promise<AvatarCreated> => {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.put<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/high5/${spaceName}`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
