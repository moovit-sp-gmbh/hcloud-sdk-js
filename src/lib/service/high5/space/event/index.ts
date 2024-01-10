import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { Event } from "../../../../interfaces/high5/space/event";
import { High5Stream } from "./stream";
import { SearchFilter, SearchParams } from "../../../../interfaces/global";
import { SearchFilterDTO } from "../../../../helper/searchFilter";

export class High5Event extends Base {
    public stream: High5Stream;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.stream = new High5Stream(this.options, this.axios);
    }

    /**
     * Retrieves all Events of a High5 Space which match the provided search filter(s). Will return all Events of the Space if no filter is provided.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Events and the total number of results found in the database (independent of limit and page)
     */
    public searchEvents = async ({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<[Event[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Event[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves an Event by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the Event
     * @returns The requested Event
     */
    public getEvent = async (orgName: string, spaceName: string, eventName: string): Promise<Event> => {
        const resp = await this.axios.get<Event>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}`));

        return resp.data;
    };

    /**
     * Creates a new Event in the provided Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param name Name of the new Event
     * @returns The created Event
     */
    public createEvent = async (orgName: string, spaceName: string, name: string): Promise<Event> => {
        const resp = await this.axios.post<Event>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events`), { name: name });

        return resp.data;
    };

    /**
     * Rename an event
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the Event
     * @param name New name of the Event
     * @returns Updated Event
     */
    public renameEvent = async (orgName: string, spaceName: string, eventName: string, name: string): Promise<Event> => {
        const resp = await this.axios.patch<Event>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/name`), {
            name: name,
        });

        return resp.data;
    };

    /**
     * Deletes an Event by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the Event
     */
    public deleteEvent = async (orgName: string, spaceName: string, eventName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
