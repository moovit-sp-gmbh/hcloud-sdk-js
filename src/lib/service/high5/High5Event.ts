import axios from "axios";
import base, { Options } from "../../base";
import { Event } from "../../interfaces/High5";

export class High5Event extends base {
    constructor(opts: Options) {
        super(opts);
    }

    /**
     * getEvents returns all event for an app
     * @param appId the app's id
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns App array
     */
    public getEvents = async (appId: string, limit?: number, page?: number): Promise<Event[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await axios.get<Event[]>(this.getEndpoint(`/v1/event/list/${appId}?page=${page}&limit=${limit}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * getEventById returns an event by its ID
     * @param eventId the event's id
     * @returns Event
     */
    public getEventById = async (eventId: string): Promise<Event> => {
        const resp = await axios.get<Event>(this.getEndpoint(`/v1/event/${eventId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createEvent returns the newly created event
     * @param appId the app's id the event should be created for
     * @param name the name for the new event
     * @returns event
     */
    public createEvent = async (appID: string, name: string): Promise<Event> => {
        const resp = await axios.post<Event>(this.getEndpoint(`/v1/event/${appID}`), { name: name }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteEventById delete an event by its ID
     * @param eventId the event's id
     */
    public deleteEventById = async (eventId: string): Promise<void> => {
        await axios.delete<void>(this.getEndpoint(`/v1/event/${eventId}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/high5${endpoint}`;
    }
}
