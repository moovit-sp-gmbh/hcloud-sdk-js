import Base from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliUser extends Base {
    /**
     * Creates a default avatar for the requesting user.
     * @returns Public URL of the created avatar
     */
    async createAvatar(): Promise<AvatarCreated> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/user`), {});
        return resp.data;
    }

    /**
     * Deletes the avatar of the requesting user from cloud storage. If you want to update it instead, use updateAvatar().
     */
    async deleteAvatar(): Promise<void> {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/user`));
    }

    /**
     * Updates the avatar of the requesting user.
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar(file: File): Promise<AvatarCreated> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.put<AvatarCreated>(this.getEndpoint(`/v1/avatar/user`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
