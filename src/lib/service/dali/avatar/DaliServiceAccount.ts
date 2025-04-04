import Base from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliServiceAccount extends Base {
    /**
     * Creates a default avatar for the specified service account.
     * @param orgName Name of the organization
     * @param serviceAccountId ID of the service account
     * @returns Public URL of the created avatar
     */
    async createAvatar(orgName: string, serviceAccountId: string): Promise<AvatarCreated> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/service-accounts/${serviceAccountId}`), {});

        return resp.data;
    }

    /**
     * Deletes the avatar of the service account from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param serviceAccountId ID of the service account
     */
    async deleteAvatar(orgName: string, serviceAccountId: string): Promise<void> {
        await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/service-accounts/${serviceAccountId}`));
    }

    /**
     * Updates the avatar of the specified service account.
     * @param orgName Name of the organization
     * @param serviceAccountId ID of the service account
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar(orgName: string, serviceAccountId: string, file: File): Promise<AvatarCreated> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.put<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/service-accounts/${serviceAccountId}`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
