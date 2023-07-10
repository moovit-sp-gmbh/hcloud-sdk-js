import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { Event } from "../../../interfaces/High5";
import { High5Stream } from "./event/High5Stream";
import { SearchFilter, SearchParams } from "../../../interfaces/Global";
import { SearchFilterDTO } from "../../../helper/searchFilter";

export class High5Event extends base {
    public stream: High5Stream;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.stream = new High5Stream(this.options, this.axios);
    }

    /**
     * searchEvents returns all events for a space that match the search filter
     * @param {SearchParams & { orgName: string, spaceName: string }} params Search parameters
     * @param {string} params.orgName Name of the organization
     * @param {string} params.spaceName Name of the space
     * @param {SearchFilter[]} [params.filters] an array of search filters
     * @param {Sorting} [params.sorting] an optional sorting direction
     * @param {number} [params.limit=25] an optional response limit limit (1-100; defaults to 25)
     * @param {number} [params.page=0] - an optional page to skip certain results (page * limit; defaults to 0)
     * @returns Space array
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

        const resp = await this.axios
            .post<Event[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/search?page=${page}&limit=${limit}`), {
                filters: filtersDTO,
                sorting: sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getEventByName returns an event by it's name
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @returns Event
     */
    public getEventByName = async (orgName: string, spaceName: string, eventName: string): Promise<Event> => {
        const resp = await this.axios
            .get<Event>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createEvent returns the newly created event
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param name the name for the new event
     * @returns event
     */
    public createEvent = async (orgName: string, spaceName: string, name: string): Promise<Event> => {
        const resp = await this.axios
            .post<Event>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events`), { name: name })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteEventByName delete an event by it's name
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     */
    public deleteEventByName = async (orgName: string, spaceName: string, eventName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
