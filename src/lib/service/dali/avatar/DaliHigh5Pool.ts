import Base from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliHigh5Pool extends Base {
    /**
     * Creates a default avatar for the specified High5 pool.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param poolName Name of the pool
     * @returns Public URL of the created avatar
     */
    async createAvatar(orgName: string, spaceName: string, poolName: string): Promise<AvatarCreated> {
        const resp = await this.axios.post<AvatarCreated>(
            this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/high5/${spaceName}/pools/${poolName}`),
            {}
        );

        return resp.data;
    }

    /**
     * Deletes the avatar of the High5 pool from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param poolName Name of the pool
     */
    async deleteAvatar(orgName: string, spaceName: string, poolName: string): Promise<void> {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/high5/${spaceName}/pools/${poolName}`));
    }

    /**
     * Updates the avatar of the specified High5 pool
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param poolName Name of the pool
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar(orgName: string, spaceName: string, poolName: string, file: File): Promise<AvatarCreated> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.put<AvatarCreated>(
            this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/high5/${spaceName}/pools/${poolName}`),
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
