import Base, { MaybeRaw } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";
import { StorageDto } from "../../../interfaces/global/Storage";

export class DaliStorage extends Base {
    /**
     * Creates a default avatar for the specified storage.
     * @param orgName Name of the organization
     * @param storageName Name of the storage
     * @returns Public URL of the created avatar
     */
    async createAvatar<R extends boolean = false>(orgName: string, storageName: string, raw?: { raw: R }): Promise<MaybeRaw<R, AvatarCreated>> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/storages/${storageName}`), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AvatarCreated>;
    }

    /**
     * Deletes the avatar of the storage from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param storageName Name of the storage
     */
    async deleteAvatar<R extends boolean = false>(orgName: string, storageName: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/storages/${storageName}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    /**
     * Updates the avatar of the specified storage.
     * @param orgName Name of the organization
     * @param storageName Name of the storage
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar<R extends boolean = false>(
        orgName: string,
        storageName: string,
        file: File,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, StorageDto>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<StorageDto>(this.getEndpoint(`/v1/avatar/org/${orgName}/storages/${storageName}`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StorageDto>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
