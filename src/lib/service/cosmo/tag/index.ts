import Base from "../../../Base";
import { CreateTag, PatchTag, Tag } from "../../../interfaces/cosmo/tag/tag";

/**
 * @class Tag
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents an Asset resource in Cosmo, providing methods to interact with the Asset API.
 */
export class CosmoTag extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Tag in Cosmo inside the specified Organization, Space and Namespace.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param createTag The Tag to be created
     * @returns The created tag
     */
    async createTag(orgName: string, spaceName: string, namespaceName: string, createTag: CreateTag): Promise<Tag> {
        const resp = await this.axios.post<Tag>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/tags`),
            createTag
        );

        return resp.data;
    }

    /**
     * Get a list of all Tags in Cosmo inside the specified Organization, Space and Namespace.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param createTag The Tag to be created
     * @returns The created tag
     */
    async getTags(orgName: string, spaceName: string, namespaceName: string): Promise<Tag[]> {
        const resp = await this.axios.get<Tag[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/tags`));

        return resp.data;
    }

    /**
     * Update a Tag in Cosmo inside the specified Organization, Space and Namespace.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param tagName Name of the Tag to be updated
     * @param patchTag The Tag data to be updated
     * @returns The updated tag
     */
    async updateTag(orgName: string, spaceName: string, namespaceName: string, tagName: string, patchTag: PatchTag): Promise<Tag> {
        const resp = await this.axios.patch<Tag>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/tags/${tagName}`),
            patchTag
        );

        return resp.data;
    }

    /**
     * Delete a Tag in Cosmo inside the specified Organization, Space and Namespace.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param tagName Name of the Tag to be deleted
     * @returns 204 No Content if successful
     */
    async deleteTag(orgName: string, spaceName: string, namespaceName: string, tagName: string): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/tags/${tagName}`));
    }
}
