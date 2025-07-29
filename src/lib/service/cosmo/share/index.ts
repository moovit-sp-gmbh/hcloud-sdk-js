import Base from "../../../Base";
import { Share, ShareCreate } from "../../../interfaces/cosmo/share";

/**
 * @class Share
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Share resource in Cosmo, providing methods to interact with the Share API.
 */
export class CosmoShare extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Share in the specified Organization and Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param createShare The Share object to create
     *
     * @returns The created Share
     */
    async createShare(orgName: string, spaceName: string, createShare: ShareCreate): Promise<Share> {
        const resp = await this.axios.post<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares`), createShare);

        return resp.data;
    }

    /**
     * Links the user to a Share, making the assets shared available to the user
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId The ID of the Share to link
     *
     * @returns The created Share
     */
    async linkShare(orgName: string, spaceName: string, shareId: string, password: string): Promise<Share> {
        const resp = await this.axios.put<Share>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}`), { password });

        return resp.data;
    }

    /**
     * Fetch shared Assets.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId The ID of the Share to link
     * @param limit The number of assets to return
     * @param page The page number to return
     * @param namespace The namespace to filter by
     *
     * @returns The created Share
     */
    async fetchSharedAssets(orgName: string, spaceName: string, shareId: string, limit: number, page: number, namespace: string): Promise<Share[]> {
        const resp = await this.axios.get<Share[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}?limit=${limit}&page=${page}&namespace=${namespace}`)
        );

        return resp.data;
    }

    /**
     * Delete a Share.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param shareId The ID of the Share to link
     *
     * @returns 204 No Content if successful
     */
    async deleteShare(orgName: string, spaceName: string, shareId: string): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/shares/${shareId}`));
    }
}
