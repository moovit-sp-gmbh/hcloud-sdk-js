import Base, { MaybeRaw } from "../../../Base";
import { StreamCacheMetadata, StreamCacheWipeResult } from "../../../interfaces/agent/cache";

export class AgentCache extends Base {
    /**
     * Retrieves metadata for all currently cached stream definitions.
     * The cached design content is not exposed.
     * @returns Array of cached stream metadata
     */
    async listStreamCache<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, StreamCacheMetadata[]>> {
        const resp = await this.axios.get<StreamCacheMetadata[]>(this.getEndpoint(`/v1/cache`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StreamCacheMetadata[]>;
    }

    /**
     * Retrieves metadata for a single cached stream entry by stream ID.
     * The cached design content is not exposed.
     * @param streamId - ID of the stream
     * @returns Cached stream metadata
     */
    async getStreamCache<R extends boolean = false>(streamId: string, raw?: { raw: R }): Promise<MaybeRaw<R, StreamCacheMetadata>> {
        const resp = await this.axios.get<StreamCacheMetadata>(this.getEndpoint(`/v1/cache/${streamId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StreamCacheMetadata>;
    }

    /**
     * Deletes a single cached stream entry by stream ID.
     * Does not interrupt currently running executions.
     * @param streamId - ID of the stream cache entry to delete
     */
    async deleteStreamCache<R extends boolean = false>(streamId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/cache/${streamId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    /**
     * Deletes all cached stream entries.
     * Does not interrupt currently running executions, future executions will rebuild the cache naturally.
     * @returns Number of deleted cache entries
     */
    async clearCache<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, StreamCacheWipeResult>> {
        const resp = await this.axios.delete<StreamCacheWipeResult>(this.getEndpoint(`/v1/cache`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StreamCacheWipeResult>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
