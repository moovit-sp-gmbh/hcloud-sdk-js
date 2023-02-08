import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { Event } from "../../../interfaces/High5";
import { High5Execute } from "./High5Execute";
import { High5Stream } from "./event/High5Stream";

export class High5Event extends base {
    public stream: High5Stream;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.stream = new High5Stream(this.options, this.axios);
    }

    /**
     * getEvents returns all event for an app
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns App array
     */
    public getEvents = async (orgName: string, appName: string, limit?: number, page?: number): Promise<Event[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<Event[]>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getEventByName returns an event by it's name
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @returns Event
     */
    public getEventByName = async (orgName: string, appName: string, eventName: string): Promise<Event> => {
        const resp = await this.axios.get<Event>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createEvent returns the newly created event
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param name the name for the new event
     * @returns event
     */
    public createEvent = async (orgName: string, appName: string, name: string): Promise<Event> => {
        const resp = await this.axios
            .post<Event>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events`), { name: name })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteEventByName delete an event by it's name
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     */
    public deleteEventByName = async (orgName: string, appName: string, eventName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
