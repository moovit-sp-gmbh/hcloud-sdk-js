import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { Event } from "../../../interfaces/High5";
import { High5Execute } from "./High5Execute";
import { High5Stream } from "./event/High5Stream";
import { SearchFilter, Sorting } from "../../../interfaces/Global";
import { SearchFilterDTO } from "../../../helper/searchFilter";

export class High5Event extends base {
    public stream: High5Stream;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.stream = new High5Stream(this.options, this.axios);
    }

    /**
     * getEvents returns all event for a space
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns Space array
     */
    public getEvents = async (orgName: string, spaceName: string, limit?: number, page?: number): Promise<Event[]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios
            .get<Event[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * searchEvents returns all events for a space that match the search filter
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param filters an optional array of searchFilter objects
     * @param sorting an optional sorting object
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns Space array
     */
    public searchEvents = async (
        orgName: string,
        spaceName: string,
        filters: SearchFilter[],
        sorting: Sorting,
        limit = 25,
        page = 0
    ): Promise<[Event[], number]> => {
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
