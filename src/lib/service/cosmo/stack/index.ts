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
     * Attach Assets to an existing Stack in Cosmo.
     *
     * @param organizationName Name of the Organization
     * @param spaceName Name of the Space
     * @param stackId ID of the Stack
     * @param assetIds Array of Asset IDs to attach
     * @param raw (optional) If true, returns the raw Axios response
     * @returns The updated Stack
     */
    async attachAssetsToStack<R extends boolean = false>(
        organizationName: string,
        spaceName: string,
        stackId: string,
        assetIds: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stack>> {
        const resp = await this.axios.post<Stack>(this.getEndpoint(`/v1/org/${organizationName}/spaces/${spaceName}/stacks/${stackId}/assets/add`), {
            assetIds: assetIds,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stack>;
    }

    /**
     * Detach an Asset from a Stack in Cosmo.
     *
     * @param organizationName Name of the Organization
     * @param spaceName Name of the Space
     * @param stackId ID of the Stack
     * @param assetIds Array of Asset IDs to detach
     * @param raw (optional) If true, returns the raw Axios response
     * @returns The updated Stack
     */
    async detachAssetsFromStack<R extends boolean = false>(
        organizationName: string,
        spaceName: string,
        stackId: string,
        assetIds: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stack>> {
        const resp = await this.axios.post<Stack>(this.getEndpoint(`/v1/org/${organizationName}/spaces/${spaceName}/stacks/${stackId}/assets/remove`), {
            assetIds: assetIds,
        });

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
