import Base from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliOrganization extends Base {
    /**
     * Creates a default avatar for the specified organization.
     * @param orgName Name of the organization
     * @returns Public URL of the created avatar
     */
    async createAvatar(orgName: string): Promise<AvatarCreated> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}`), {});

        return resp.data;
    }

    /**
     * Deletes the avatar of the organization from cloud storage. If you want to update it, use updateAvatar() instead.
     * @param orgName Name of the organization
     */
    async deleteAvatar(orgName: string): Promise<void> {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}`));
    }

    /**
     * Updates the avatar of the specified organization.
     * @param orgName Name of the organization
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar(orgName: string, file: File): Promise<AvatarCreated> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.put<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
