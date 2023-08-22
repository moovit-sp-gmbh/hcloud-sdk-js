import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliTeam extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Creates a default avatar for the specified team.
     * @param orgName Name of the organization
     * @param teamName Name of the team
     * @returns Public URL of the created avatar
     */
    public createAvatar = async (orgName: string, teamName: string): Promise<AvatarCreated> => {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/teams/${teamName}`), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Deletes the avatar of the team from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param teamName Name of the team
     */
    public deleteAvatar = async (orgName: string, teamName: string): Promise<void> => {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/teams/${teamName}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * Updates the avatar of the specified team.
     * @param orgName Name of the organization
     * @param teamName Name of the team
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    public updateAvatar = async (orgName: string, teamName: string, file: File): Promise<AvatarCreated> => {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios
            .put<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/teams/${teamName}`), data, {
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
