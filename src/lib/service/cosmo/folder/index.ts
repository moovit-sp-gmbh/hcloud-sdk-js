import Base from "../../../Base";
import { Folder } from "../../../interfaces/cosmo/folder";

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
    async createFolder(orgName: string, spaceName: string, folderName: string, parentId?: string): Promise<Folder> {
        const resp = await this.axios.post<Folder>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/folders`), {
            name: folderName,
            parentId: parentId,
        });

        return resp.data;
    }

    /**
     * Rename a folder
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param folderId ID of the Folder to rename
     * @param newFolderName New name for the Folder
     * @returns The renamed Folder
     */
    async renameFolder(orgName: string, spaceName: string, folderId: string, newFolderName: string): Promise<Folder> {
        const resp = await this.axios.patch<Folder>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/folders/${folderId}/name`), {
            name: newFolderName,
        });

        return resp.data;
    }

    /**
     * Get a folder by its ID
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param folderId ID of the Folder to retrieve
     * @returns The requested Folder
     */
    async getFolderById(orgName: string, spaceName: string, folderId: string): Promise<Folder> {
        const resp = await this.axios.get<Folder>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/folders/${folderId}`));

        return resp.data;
    }

    /**
     * Delete a folder by its ID
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param folderId ID of the Folder to delete
     * @param force (not implemented yet - default false) If true, the folder will be deleted even if it contains items. If false, the folder must be empty to be deleted.
     * @returns 204 No Content on success
     */
    async deleteFolder(orgName: string, spaceName: string, folderId: string, force: boolean = false): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/folders/${folderId}?force=${force}`));
    }

    /**
     * Move a folder to a new parent folder
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param folderId ID of the Folder to move
     * @param newParentId ID of the new parent Folder
     * @returns The moved Folder
     */
    async moveFolder(orgName: string, spaceName: string, folderId: string, newParentId: string): Promise<Folder> {
        const resp = await this.axios.patch<Folder>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/folders/${folderId}/move`), {
            parentId: newParentId,
        });

        return resp.data;
    }
}
