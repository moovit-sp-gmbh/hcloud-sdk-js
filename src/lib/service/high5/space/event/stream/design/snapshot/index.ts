import Base from "../../../../../../../Base";
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
    async search(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        content = false,
        { filters, sorting, limit = 25, page = 0 }: SearchParams
    ): Promise<PaginatedResponse<DesignSnapshot>> {
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

        return createPaginatedResponse(resp) as PaginatedResponse<DesignSnapshot>;
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
    async create(orgName: string, spaceName: string, eventName: string, streamId: string, name: string): Promise<DesignSnapshot> {
        const resp = await this.axios.post<DesignSnapshot>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots`),
            { name }
        );

        return resp.data;
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
    async update(orgName: string, spaceName: string, eventName: string, streamId: string, snapshotId: string, name: string): Promise<DesignSnapshot> {
        const resp = await this.axios.patch<DesignSnapshot>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}`),
            { name }
        );

        return resp.data;
    }

    /**
     * Delete a stream design's snapshot.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param snapshotId ID of the snapshot
     */
    async delete(orgName: string, spaceName: string, eventName: string, streamId: string, snapshotId: string): Promise<void> {
        await this.axios.delete<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}`)
        );
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
    async restore(orgName: string, spaceName: string, eventName: string, streamId: string, snapshotId: string): Promise<void> {
        await this.axios.put<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}/restore`)
        );
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
