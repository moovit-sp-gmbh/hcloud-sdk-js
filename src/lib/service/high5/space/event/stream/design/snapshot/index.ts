import Base, { MaybeRaw } from "../../../../../../../Base";
import { createPaginatedResponse } from "../../../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../../../interfaces/global";
import DesignSnapshot from "../../../../../../../interfaces/high5/space/event/stream/design/snapshot";

export default class High5DesignSnapshots extends Base {
    /**
     * Search the snapshots of stream's design.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param content (optional) Is it necessary to retrieve content for each snapshot (disabled by default)
     * @param filters Search filters to apply
     * @param sorting Sorting criteria for the result
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of snapshots of the stream design and the total number of results found in the database (independent of limit and page)
     */
    async search<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        content = false,
        { filters, sorting, limit = 25, page = 0 }: SearchParams,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<DesignSnapshot>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<DesignSnapshot[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/search`),
            {
                filters: filtersDTO,
                sorting,
            },
            {
                params: { content, limit, page },
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<DesignSnapshot>
        >;
    }

    /**
     * Create a snapshot of stream's design.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param name Name of the snapshot
     * @returns The snapshot
     */
    async create<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        name: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, DesignSnapshot>> {
        const resp = await this.axios.post<DesignSnapshot>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots`),
            { name }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, DesignSnapshot>;
    }

    /**
     * Update a snapshot's name.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param snapshotId ID of the snapshot
     * @param name Name of the snapshot
     * @returns The snapshot
     */
    async update<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        snapshotId: string,
        name: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, DesignSnapshot>> {
        const resp = await this.axios.patch<DesignSnapshot>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}`),
            { name }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, DesignSnapshot>;
    }

    /**
     * Delete a stream design's snapshot.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param snapshotId ID of the snapshot
     */
    async delete<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        snapshotId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}`)
        );
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Restore a stream's design to a certain snapshot.
     *
     * **WARNING**: This is a destructive action. It will overwrite the current design for the stream.
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param snapshotId ID of the snapshot
     */
    async restore<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        snapshotId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.put<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}/restore`)
        );
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
