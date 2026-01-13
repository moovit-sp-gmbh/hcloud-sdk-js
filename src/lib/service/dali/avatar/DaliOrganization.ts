import Base, { MaybeRaw } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";
import { Organization } from "../../../interfaces/idp/organization";

export class DaliOrganization extends Base {
    /**
     * Creates a default avatar for the specified organization.
     * @param orgName Name of the organization
     * @returns Public URL of the created avatar
     */
    async createAvatar<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, AvatarCreated>> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}`), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AvatarCreated>;
    }

    /**
     * Deletes the avatar of the organization from cloud storage. If you want to update it, use updateAvatar() instead.
     * @param orgName Name of the organization
     */
    async deleteAvatar<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    /**
     * Updates the avatar of the specified organization.
     * @param orgName Name of the organization
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar<R extends boolean = false>(orgName: string, file: File, raw?: { raw: R }): Promise<MaybeRaw<R, Organization>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<Organization>(`${this.options.server}/api/account/v1/org/${orgName}/avatar`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Organization>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
