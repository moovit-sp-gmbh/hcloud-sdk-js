import Base, { MaybeRaw } from "../../../Base"
import { Asset, NamespaceRushStatus } from "../../../interfaces/cosmo/asset"
import { Namespace } from "../../../interfaces/cosmo/namespace"

/**
 * @class Namespace
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Namespace resource in Cosmo, providing methods to interact with the Namespace API.
 */
export class CosmoNamespace extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Namespace in the specified Organization and Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace to create
     * @param defaultStatus Status that asset references within this namespace will have by default
     * @returns The created Namespace
     */
    async createNamespace<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        defaultStatus = "none",
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Namespace>> {
        const resp = await this.axios.post<Namespace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces`), {
            name: namespaceName,
            defaultStatus,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Namespace>;
    }

    /**
     * Change the status of a reference (e.g. Asset)
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param refId ID of the reference to change status
     * @param status New status to set for the reference
     * @returns The updated Reference
     */
    async changeStatus<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        refId: string,
        namespaceName: string,
        status: NamespaceRushStatus,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset>> {
        const resp = await this.axios.patch<Asset>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/ref/${refId}/status`),
            { status }
        );

        // TypeScript can't infer conditional type at runtime, so we assert
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset>;
    }
}
