import { AxiosInstance } from "axios";
import base, { Options } from "../../../../base";
import { Event, Stream, StreamPatchOrder } from "../../../../interfaces/High5";
import { High5Execute } from "../High5Execute";
import { High5Design } from "./stream/High5Design";
import { High5Node } from "./stream/High5Node";

export class High5Stream extends base {
    public design: High5Design;
    public node: High5Node;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.design = new High5Design(this.options, this.axios);
        this.node = new High5Node(this.options, this.axios);
    }

    /**
     * getStreams returns all streams for an event
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns App array
     */
    public getStreams = async (orgName: string, appName: string, eventName: string, limit?: number, page?: number): Promise<Stream[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<Stream[]>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}/streams?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getStreamById returns a stream by its ID
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @returns Event
     */
    public getStreamById = async (orgName: string, appName: string, eventName: string, streamId: string): Promise<Stream> => {
        const resp = await this.axios
            .get<Stream>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}/streams/${streamId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createStream returns the newly created stream
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @param name the name for the new stream
     * @returns event
     */
    public createStream = async (orgName: string, appName: string, eventName: string, name: string): Promise<Stream> => {
        const resp = await this.axios
            .post<Stream>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}/streams`), { name: name })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Patch the order all Streams of an event (require WRITE rights)
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @param StreamPatchOrder A list of all event streams with their new order
     * @returns Stream[] array of the updated streams
     */
    public patchStreamOrder = async (orgName: string, appName: string, eventName: string, streamList: StreamPatchOrder[]): Promise<Stream[]> => {
        const resp = await this.axios
            .patch<Stream[]>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}/streams`), streamList)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteStreamById delete an stream by its ID
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @param streamId the stream's id
     */
    public deleteStreamById = async (orgName: string, appName: string, eventName: string, streamId: string): Promise<void> => {
        await this.axios
            .delete<void>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}/streams/${streamId}`))
            .catch((err: Error) => {
                throw err;
            });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
