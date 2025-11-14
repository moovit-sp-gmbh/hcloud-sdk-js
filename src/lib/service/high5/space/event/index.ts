import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { Event } from "../../../../interfaces/high5/space/event";
import { High5Stream } from "./stream";

export class High5Event extends Base {
    public get stream(): High5Stream {
        if (this._stream === undefined) {
            this._stream = new High5Stream(this.options, this.axios);
        }
        return this._stream;
    }
    private _stream?: High5Stream;

    /**
     * Retrieves all Events of a High5 Space which match the provided search filter(s). Will return all Events of the Space if no filter is provided.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Events and the total number of results found in the database (independent of limit and page)
     */
    async searchEvents<R extends boolean = false>(
        { orgName, spaceName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string; spaceName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Event>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Event[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<R, PaginatedResponse<Event>>;
    }

    /**
     * Retrieves an Event by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the Event
     * @returns The requested Event
     */
    async getEvent<R extends boolean = false>(orgName: string, spaceName: string, eventName: string, raw?: { raw: R }): Promise<MaybeRaw<R, Event>> {
        const resp = await this.axios.get<Event>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Event>;
    }

    /**
     * Creates a new Event in the provided Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param name Name of the new Event
     * @returns The created Event
     */
    async createEvent<R extends boolean = false>(orgName: string, spaceName: string, name: string, raw?: { raw: R }): Promise<MaybeRaw<R, Event>> {
        const resp = await this.axios.post<Event>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events`), { name: name });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Event>;
    }

    /**
     * Rename an event
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the Event
     * @param name New name of the Event
     * @returns Updated Event
     */
    async renameEvent<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        name: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Event>> {
        const resp = await this.axios.patch<Event>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/name`), {
            name: name,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Event>;
    }

    /**
     * Deletes an Event by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the Event
     */
    async deleteEvent<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
