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
     * @returns void after successful deletion
     */
    public deleteAvatar = async (): Promise<void> => {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/user`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
