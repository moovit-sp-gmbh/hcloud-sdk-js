import Base from "../../../Base";
import { Asset, NamespaceRushStatus } from "../../../interfaces/cosmo/asset";
import { Namespace } from "../../../interfaces/cosmo/namespace";

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
     * @returns The created Namespace
     */
    async createNamespace(orgName: string, spaceName: string, namespaceName: string): Promise<Namespace> {
        const resp = await this.axios.post<Namespace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces`), {
            name: namespaceName,
        });

        return resp.data;
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
    async changeStatus(orgName: string, spaceName: string, refId: string, namespaceName: string, status: NamespaceRushStatus): Promise<Asset> {
        const resp = await this.axios.patch<Asset>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/ref/${refId}/status`),
            {
                status: status,
            }
        );

        return resp.data;
    }
}
