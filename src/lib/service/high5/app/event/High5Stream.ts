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
     * @param eventId the event's id
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns App array
     */
    public getStreams = async (eventId: string, limit?: number, page?: number): Promise<Stream[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<Stream[]>(this.getEndpoint(`/v1/stream/list/${eventId}?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getStreamById returns a stream by its ID
     * @param streamID the event's id
     * @returns Event
     */
    public getStreamById = async (streamId: string): Promise<Stream> => {
        const resp = await this.axios.get<Stream>(this.getEndpoint(`/v1/stream/${streamId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createEvent returns the newly created event
     * @param eventId the events's id the stream should be created for
     * @param name the name for the new event
     * @returns event
     */
    public createStream = async (eventId: string, name: string): Promise<Stream> => {
        const resp = await this.axios.post<Stream>(this.getEndpoint(`/v1/stream/${eventId}`), { name: name }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Patch the order all Streams of an event (require WRITE rights)
     * @param StreamPatchOrder A list of all event streams with their new order
     * @returns Stream[] array of the updated streams
     */
    public patchStreamOrder = async (eventId: string, streamList: StreamPatchOrder[]): Promise<Stream[]> => {
        const resp = await this.axios.patch<Stream[]>(this.getEndpoint(`/v1/stream/${eventId}/order`), streamList).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteStreamById delete an stream by its ID
     * @param streamId the event's id
     */
    public deleteStreamById = async (streamId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/stream/${streamId}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
