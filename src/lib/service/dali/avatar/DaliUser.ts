import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { AvatarCreated } from "../../../interfaces/Dali";

export class DaliUser extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * createAvatar returns the newly created avatar as URL
     * @returns {AvatarCreated} AvatarCreated
     */
    public createAvatar = async (): Promise<AvatarCreated> => {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/user`), {}).catch((err: Error) => {
            throw err;
        });
        return resp.data;
    };

    /**
     * deleteAvatar deletes the avatar for current user
     * @returns nothing after successful deletion
     */
    public deleteAvatar = async (): Promise<void> => {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/user`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * updateAvatar returns the uploaded and processed avatar as URL
     * @param {string} file the image as file
     * @returns {AvatarCreated} AvatarCreated
     */
    public updateAvatar = async (file: File): Promise<AvatarCreated> => {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios
            .put<AvatarCreated>(this.getEndpoint(`/v1/avatar/user`), data, {
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
