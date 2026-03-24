import Base, { MaybeRaw } from "../../../Base";
import { ICosmoStats } from "../../../interfaces/cosmo/stats";

/**
 * @class Space
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Stats resource in Cosmo, providing get methods to retrieve statistics with the Stats API.
 */
export class CosmoStats extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Fetch org related stats
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @returns The requested org stats
     */
    async getOrgStats<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, ICosmoStats>> {
        const resp = await this.axios.get<ICosmoStats>(this.getEndpoint(`/v1/org/${orgName}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoStats>;
    }

    /**
     * Fetch space related stats
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @returns The requested space stats
     */
    async getSpaceStats<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, ICosmoStats>> {
        const resp = await this.axios.get<ICosmoStats>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ICosmoStats>;
    }
}
