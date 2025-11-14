import Base, { MaybeRaw } from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { SingleStreamPatchOrder, Stream, StreamPatchActive, StreamPatchOrder } from "../../../../../interfaces/high5/space/event/stream";
import { High5Design } from "./design";

export class High5Stream extends Base {
    public get design(): High5Design {
        if (this._design === undefined) {
            this._design = new High5Design(this.options, this.axios);
        }
        return this._design;
    }
    private _design?: High5Design;

    /**
     * Retrieves all Streams of an Event which match the provided search filter(s). Will return all Streams if no filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of streams as well as the total number of results found in the database (independent of limit and page)
     */
    async searchStreams<R extends boolean = false>(
        {
            orgName,
            spaceName,
            eventName,
            filters,
            sorting,
            limit = 25,
            page = 0,
        }: SearchParams & {
            orgName: string;
            spaceName: string;
            eventName: string;
        },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Stream>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Stream[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<Stream>
        >;
    }

    /**
     * Retrieves a Stream by its ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @returns The requested stream
     */
    async getStream<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stream>> {
        const resp = await this.axios.get<Stream>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stream>;
    }

    /**
     * Creates a new Stream for the specified Event.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param name Name for the new stream
     * @returns The created stream
     */
    async createStream<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        name: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stream>> {
        const resp = await this.axios.post<Stream>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams`), {
            name: name,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stream>;
    }

    /**
     * Duplicate a Stream for the specified Event.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param name Name for the new stream
     * @param sourceStreamId ID for the stream to duplicate
     * @returns The created stream
     */
    async duplicateStream<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        name: string,
        sourceStreamId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stream>> {
        const resp = await this.axios.post<Stream>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams`), {
            name: name,
            streamId: sourceStreamId,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stream>;
    }

    /**
     * Patches the order of Streams for an Event.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param StreamPatchOrder List of all event streams with their new order
     * @returns Array of updated Streams
     */
    async patchStreamOrderMulti<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamList: StreamPatchOrder[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stream[]>> {
        const resp = await this.axios.patch<Stream[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/order`),
            streamList
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stream[]>;
    }

    /**
     * Activate or deactivate a stream
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param StreamPatchActive Object defining if stream should be active or inactive
     * @returns Details of the updated stream
     */
    async patchStreamState<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        streamPatchActive: StreamPatchActive,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stream>> {
        const resp = await this.axios.patch<Stream>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/active`),
            streamPatchActive
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stream>;
    }

    /**
     * Moves a Stream up or down in the existing Streams order.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param SingleStreamPatchOrder Object defining if stream should move up or down
     * @returns Array of updated Streams
     */
    async patchStreamOrder<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        singleStreamPatchOrder: SingleStreamPatchOrder,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stream[]>> {
        const resp = await this.axios.patch<Stream[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/order`),
            singleStreamPatchOrder
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stream[]>;
    }

    /**
     * Rename a stream
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param name New name of the stream
     * @returns Updated stream
     */
    async renameStream<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        name: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stream>> {
        const resp = await this.axios.patch<Stream>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/name`),
            { name }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stream>;
    }

    /**
     * Moves a Stream to another event.
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param newEventName Name of the new event
     * @param [name] (optional) New name for stream. Is the new event already has a stream with the same name as this one, this parameter is mandatory.
     * @param [order] (optional) Order the stream should have in the new event
     * @returns Updated Stream
     */
    async moveStream<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        newEventName: string,
        name?: string,
        order?: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Stream>> {
        const resp = await this.axios.patch<Stream>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/event`),
            { eventName: newEventName, name, order }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Stream>;
    }

    /**
     * Deletes a Stream by its ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     */
    async deleteStream<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}`)
        );
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
