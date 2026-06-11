import Base, { MaybeRaw } from "../../../Base";
import {
    High5SpaceInfo,
    CosmoSpace as ICosmoSpace,
    SpacePatchStorageDto,
    SpacePatchStorageValidationDto,
    SpaceUser,
    TrashPolicy,
} from "../../../interfaces/cosmo/space";

/**
 * @class Space
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Space resource in Cosmo, providing methods to interact with the Space API.
 */
export class CosmoSpace extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Space in the specified Organization.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param noAvatar Optional flag to create the Space without an avatar
     * @returns The created Space
     */
    async createSpace<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        noAvatar?: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ICosmoSpace>> {
        const resp = await this.axios.post<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces?noAvatar=${noAvatar ? "true" : "false"}`), {
            name: spaceName,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }

    /**
     * List spaces of an Organization.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param limit Maximum number of Spaces to return
     * @param page Page number for pagination
     * @returns A list of Spaces in the Organization
     */
    async listSpaces<R extends boolean = false>(orgName: string, limit: number, page: number, raw?: { raw: R }): Promise<MaybeRaw<R, ICosmoSpace[]>> {
        const resp = await this.axios.get<ICosmoSpace[]>(this.getEndpoint(`/v1/org/${orgName}/spaces?limit=${limit}&page=${page}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace[]>;
    }

    /**
     * Fetch a single space by its Name.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space to fetch
     * @returns The requested Space
     */
    async getSpace<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, ICosmoSpace>> {
        const resp = await this.axios.get<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }

    /**
     * Delete a Space by it's Name.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space to delete
     * @returns 204 No Content on success
     */
    async deleteSpace<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Rename a Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param newName New name for the Space
     * @returns The updated Space
     */
    async renameSpace<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        newName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ICosmoSpace>> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/name`), {
            name: newName,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }

    /**
     * Link a high5 space to a cosmo space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Cosmo Space
     * @param high5SpaceInfo Information about the high5 space
     * @returns The updated Cosmo Space
     */
    async linkSpace<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        high5SpaceInfo: High5SpaceInfo,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ICosmoSpace>> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/high5/link/space`), high5SpaceInfo);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }

    /**
     * Link a high5 space to a cosmo space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Cosmo Space
     * @param high5SpaceInfo Information about the high5 space
     * @returns The updated Cosmo Space
     */
    async unlinkSpace<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, ICosmoSpace>> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/high5/unlink/space`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }

    /**
     * List all users with access to the given Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Cosmo Space
     * @returns The SpaceUser array
     */
    async listSpaceUsers<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, SpaceUser[]>> {
        const resp = await this.axios.get<SpaceUser[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/users`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, SpaceUser[]>;
    }

    /**
     * Updates the avatar of the specified Cosmo space
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param file Image as Javascript File
     * @returns Space details with updated avatar
     */
    async updateAvatar<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        file: File,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ICosmoSpace>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/avatar`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }

    /**
     * Permanently deletes all items in the trash of the specified Cosmo space
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @returns 204 No Content on success
     */
    async emptyTrash(orgName: string, spaceName: string): Promise<void> {
        await this.axios.post<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/trash`));
    }

    /**
     * Updates the trashbin auto-delete policy for the specified Cosmo space.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param policy Trash policy to apply. If enabled, items in the trash will be automatically deleted after the specified TTL (in days).
     * @returns The updated Space
     */
    async updateTrashbinPolicy<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        policy: TrashPolicy,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ICosmoSpace>> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/trash/policy`), policy);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }

    /**
     * Update the storage configuration of a Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param storage New storage configuration for the Space
     * @returns The updated Space
     */
    async patchStorage<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        storage: SpacePatchStorageDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ICosmoSpace>> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/storage`), storage);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }

    /**
     * Sets storage as valid or unvalid with errors.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param storage Storage validation
     * @returns The updated Space
     */
    async patchStorageValid<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        storage: SpacePatchStorageValidationDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ICosmoSpace>> {
        const resp = await this.axios.patch<ICosmoSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/storage/valid`), storage);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoSpace>;
    }
}
