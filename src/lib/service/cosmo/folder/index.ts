import Base, { MaybeRaw } from "../../../Base";
import { Asset } from "../../../interfaces/cosmo/asset";

/**
 * @class Folder
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Folder resource in Cosmo, providing methods to interact with the Folder API.
 */
export class CosmoFolder extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Folder in the specified Organization and Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param folderName Name of the Folder to create
     * @param parentId Optional ID of the parent Folder. If not provided, the Folder will be created at the root level.
     * @returns The created Folder
     */
    async createFolder<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        folderName: string,
        parentId?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset>> {
        const resp = await this.axios.post<Asset>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/folders`), {
            name: folderName,
            parentId: parentId,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset>;
    }
}
