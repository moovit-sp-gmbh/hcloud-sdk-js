import Base from "../../../../../../../Base";
import { SearchFilterDTO } from "../../../../../../../helper/searchFilter";
import { SearchFilter, SearchParams } from "../../../../../../../interfaces/global/SearchFilters";
import DesignSnapshot from "../../../../../../../interfaces/high5/space/event/stream/design/snapshot";

export default class High5DesignSnapshots extends Base {
    /**
     * Search the snapshots of stream's design.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param filters Search filters to apply
     * @param sorting Sorting criteria for the result
     * @returns The snapshot
     */
    public search = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        { filters, sorting, limit = 25, page = 0 }: SearchParams
    ): Promise<[DesignSnapshot[], number]> => {
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
                params: { limit, page },
            }
        );

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Create a snapshot of stream's design.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param name Name of the snapshot
     * @returns The snapshot
     */
    public create = async (orgName: string, spaceName: string, eventName: string, streamId: string, name: string): Promise<DesignSnapshot> => {
        const resp = await this.axios.post<DesignSnapshot>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots`),
            { name }
        );

        return resp.data;
    };

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
    public update = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        snapshotId: string,
        name: string
    ): Promise<DesignSnapshot> => {
        const resp = await this.axios.patch<DesignSnapshot>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}`),
            { name }
        );

        return resp.data;
    };

    /**
     * Delete a stream design's snapshot.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param snapshotId ID of the snapshot
     */
    public delete = async (orgName: string, spaceName: string, eventName: string, streamId: string, snapshotId: string): Promise<void> => {
        await this.axios.delete<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}`)
        );
    };

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
    public restore = async (orgName: string, spaceName: string, eventName: string, streamId: string, snapshotId: string): Promise<void> => {
        await this.axios.put<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/snapshots/${snapshotId}/restore`)
        );
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
