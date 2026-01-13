import Base, { MaybeRaw } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";
import { High5Space } from "../../../interfaces/high5/space";

export class DaliHigh5Space extends Base {
    /**
     * Creates a default avatar for the specified High5 space.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @returns Public URL of the created avatar
     */
    async createAvatar<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, AvatarCreated>> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/high5/${spaceName}`), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AvatarCreated>;
    }

    /**
     * Deletes the avatar of the High5 space from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     */
    async deleteAvatar<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/high5/${spaceName}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    /**
     * Updates the avatar of the specified High5 space
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
    ): Promise<MaybeRaw<R, High5Space>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<High5Space>(`${this.options.server}/api/high5/v1/org/${orgName}/spaces/${spaceName}/avatar`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, High5Space>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
