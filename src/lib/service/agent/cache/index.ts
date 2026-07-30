import Base, { MaybeRaw } from "../../../Base";
import { StreamCacheMetadata, StreamCacheWipeResult, WaveCatalogMetadata, WaveEngineMetadata } from "../../../interfaces/agent/cache";

export class AgentCache extends Base {
    /**
     * Retrieves metadata for all currently cached stream definitions.
     * The cached design content is not exposed.
     * @returns Array of cached stream metadata
     */
    async listStreamCache<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, StreamCacheMetadata[]>> {
        const resp = await this.axios.get<StreamCacheMetadata[]>(this.getEndpoint(`/v1/cache/streams`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StreamCacheMetadata[]>;
    }

    /**
     * Retrieves metadata for a single cached stream entry by stream ID.
     * The cached design content is not exposed.
     * @param streamId - ID of the stream
     * @returns Cached stream metadata
     */
    async getStreamCache<R extends boolean = false>(streamId: string, raw?: { raw: R }): Promise<MaybeRaw<R, StreamCacheMetadata>> {
        const resp = await this.axios.get<StreamCacheMetadata>(this.getEndpoint(`/v1/cache/streams/${streamId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StreamCacheMetadata>;
    }

    /**
     * Deletes a single cached stream entry by stream ID.
     * Does not interrupt currently running executions.
     * @param streamId - ID of the stream cache entry to delete
     */
    async deleteStreamCache<R extends boolean = false>(streamId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/cache/streams/${streamId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    /**
     * Deletes all cached stream entries.
     * Does not interrupt currently running executions, future executions will rebuild the cache naturally.
     * @returns Number of deleted cache entries
     */
    async clearCache<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, StreamCacheWipeResult>> {
        const resp = await this.axios.delete<StreamCacheWipeResult>(this.getEndpoint(`/v1/cache/streams`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StreamCacheWipeResult>;
    }

    /**
     * Retrieves metadata for all Wave Engine versions currently cached on the agent.
     * @returns Array of cached Wave Engine metadata
     */
    async listEngines<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, WaveEngineMetadata[]>> {
        const resp = await this.axios.get<WaveEngineMetadata[]>(this.getEndpoint(`/v1/cache/engines`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WaveEngineMetadata[]>;
    }

    /**
     * Deletes a cached Wave Engine version from the agent.
     * @param version - Version of the cached Wave Engine to remove
     */
    async deleteEngine<R extends boolean = false>(version: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/cache/engines/${version}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    /**
     * Retrieves metadata for all Wave Catalogs currently cached on the agent.
     * @returns Array of cached Wave Catalog metadata
     */
    async listCatalogs<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, WaveCatalogMetadata[]>> {
        const resp = await this.axios.get<WaveCatalogMetadata[]>(this.getEndpoint(`/v1/cache/catalogs`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WaveCatalogMetadata[]>;
    }

    /**
     * Deletes a cached Wave Catalog from the agent.
     * @param hash - MD5 hash (of url + version) of the cached Wave Catalog to remove
     */
    async deleteCatalog<R extends boolean = false>(hash: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/cache/catalogs/${hash}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
