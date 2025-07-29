import Base from "../../../Base";
import { Production } from "../../../interfaces/cosmo/production";

/**
 * @class Production
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Production resource in Cosmo, providing methods to interact with the Production API.
 */
export class CosmoProduction extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Production in the specified Organization and Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param productionName Name of the Production to create
     * @returns The created Production
     */
    async createProduction(orgName: string, spaceName: string, productionName: string): Promise<Production> {
        const resp = await this.axios.post<Production>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/productions`), {
            name: productionName,
        });

        return resp.data;
    }
}
