import Base, { MaybeRaw } from "../../../Base";
import { Asset, AssetFilter } from "../../../interfaces/cosmo/asset";
import { Location } from "../../../interfaces/cosmo/location";

/**
 * @class Location
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Location resource in Cosmo, providing methods to interact with the Location API.
 */
export class CosmoLocation extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Location in the specified Organization and Space.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param locationName Name of the Location to create
     * @returns The created Location
     */
    async createLocation<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        locationName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Location>> {
        const resp = await this.axios.post<Location>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/locations`), {
            name: locationName,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Location>;
    }

    /**
     * Search assets of a Location.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param locationId ID of the Location to search
     * @param assetFilter Filter for assets in the Space
     * @returns The found Assets
     */
    async searchAssetsOfLocation<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        locationId: string,
        assetFilter: AssetFilter[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Asset[]>> {
        const resp = await this.axios.post<Asset[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/locations/${locationId}/assets`), {
            filters: assetFilter,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Asset[]>;
    }
}
