import Base, { MaybeRaw } from "../../../Base";
import { CosmoSpace } from "../../../interfaces/cosmo/space";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliCosmoSpace extends Base {
    /**
     * Creates a default avatar for the specified Cosmo space.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @returns Public URL of the created avatar
     */
    async createAvatar<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, AvatarCreated>> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/cosmo/${spaceName}`), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AvatarCreated>;
    }

    /**
     * Deletes the avatar of the Cosmo space from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     */
    async deleteAvatar<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/cosmo/${spaceName}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    /**
     * Updates the avatar of the specified Cosmo space
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        file: File,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AvatarCreated>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<CosmoSpace>(`${this.options.server}/api/cosmo/v1/org/${orgName}/spaces/${spaceName}/avatar`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : { url: resp.data.avatarUrl }) as MaybeRaw<R, AvatarCreated>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
