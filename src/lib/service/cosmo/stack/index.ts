import Base, { MaybeRaw } from "../../../Base";
import { Stack } from "../../../interfaces/cosmo/asset";

export class CosmoStack extends Base {
    /**
     * Create a new Stack in Cosmo inside the specified Organization and Space.
     *
     * @param organizationName Name of the Organization
     * @param spaceName Name of the Space
     * @param assetIds Array of Asset IDs to include in the Stack
     * @param raw (optional) If true, returns the raw Axios response
     * @returns The created Stack
     */
    async createStack<R extends boolean = false>(
        organizationName: string,
        spaceName: string,
        assetIds: [string, string, ...string[]],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stack>> {
        const resp = await this.axios.post<Stack>(this.getEndpoint(`/v1/org/${organizationName}/spaces/${spaceName}/stacks`), { assetIds });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stack>;
    }

    /**
     * Attach an Asset to an existing Stack in Cosmo.
     *
     * @param organizationName Name of the Organization
     * @param spaceName Name of the Space
     * @param stackId ID of the Stack
     * @param assetId ID of the Asset to attach
     * @param raw (optional) If true, returns the raw Axios response
     * @returns The updated Stack
     */
    async attachAssetToStack<R extends boolean = false>(
        organizationName: string,
        spaceName: string,
        stackId: string,
        assetId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stack>> {
        const resp = await this.axios.post<Stack>(
            this.getEndpoint(`/v1/org/${organizationName}/spaces/${spaceName}/stacks/${stackId}/assets/${assetId}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stack>;
    }

    /**
     * Detach an Asset from a Stack in Cosmo.
     *
     * @param organizationName Name of the Organization
     * @param spaceName Name of the Space
     * @param stackId ID of the Stack
     * @param assetId ID of the Asset to detach
     * @param raw (optional) If true, returns the raw Axios response
     * @returns The updated Stack
     */
    async detachAssetFromStack<R extends boolean = false>(
        organizationName: string,
        spaceName: string,
        stackId: string,
        assetId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stack>> {
        const resp = await this.axios.delete<Stack>(
            this.getEndpoint(`/v1/org/${organizationName}/spaces/${spaceName}/stacks/${stackId}/assets/${assetId}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stack>;
    }

    /**
     * Reorder the Assets in a Stack in Cosmo.
     *
     * @param organizationName Name of the Organization
     * @param spaceName Name of the Space
     * @param stackId ID of the Stack
     * @param assetIds New ordered array of Asset IDs
     * @param raw (optional) If true, returns the raw Axios response
     * @returns The updated Stack with reordered Assets
     */
    async reorderStack<R extends boolean = false>(
        organizationName: string,
        spaceName: string,
        stackId: string,
        assetIds: [string, string, ...string[]],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stack>> {
        const resp = await this.axios.patch<Stack>(this.getEndpoint(`/v1/org/${organizationName}/spaces/${spaceName}/stacks/${stackId}/order`), {
            assetIds,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stack>;
    }

    /**
     * Disband (delete) a Stack in Cosmo.
     *
     * @param organizationName Name of the Organization
     * @param spaceName Name of the Space
     * @param stackId ID of the Stack to delete
     * @param raw (optional) If true, returns the raw Axios response
     * @returns void
     */
    async disbandStack<R extends boolean = false>(
        organizationName: string,
        spaceName: string,
        stackId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${organizationName}/spaces/${spaceName}/stacks/${stackId}`));

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }
}
