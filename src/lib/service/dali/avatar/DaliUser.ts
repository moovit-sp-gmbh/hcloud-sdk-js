import { AxiosInstance } from "axios";
import { promises as fsPromises } from "fs";
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
     * uploadAvatar uploads the custom avatar for current user
     * @returns {AvatarCreated} the public url to the uploaded avatar
     */
    public uploadAvatar = async (filename: string): Promise<AvatarCreated> => {
        let form = new FormData();
        form.append("file", await fsPromises.fileRead(filename), filename);
        const resp = await this.axios.put<AvatarCreated>(this.getEndpoint(`/v1/avatar/user`), form).catch((err: Error) => {
            throw err;
        });
        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
