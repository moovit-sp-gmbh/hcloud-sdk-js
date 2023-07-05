import { AxiosInstance } from "axios";
import base, { Options } from "../../../../base";
import { Event, Stream, StreamPatchOrder } from "../../../../interfaces/High5";
import { High5Execute } from "../High5Execute";
import { High5Design } from "./stream/High5Design";
import { High5Node } from "./stream/High5Node";
import { SearchFilter, Sorting } from "../../../../interfaces/Global";
import { SearchFilterDTO } from "../../../../helper/searchFilter";

export class High5Stream extends base {
    public design: High5Design;
    public node: High5Node;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.design = new High5Design(this.options, this.axios);
        this.node = new High5Node(this.options, this.axios);
    }

    /**
     * searchStreams returns all streams for an event that match the search filter
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param filters an optional array of searchFilter objects
     * @param sorting an optional sorting object
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns Space array
     */
    public searchStreams = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        filters?: SearchFilter[],
        sorting?: Sorting,
        limit = 25,
        page = 0
    ): Promise<[Stream[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios
            .post<Stream[]>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/search?page=${page}&limit=${limit}`),
                {
                    filters: filtersDTO,
                    sorting: sorting,
                }
            )
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getStreamById returns a stream by its ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @returns Event
     */
    public getStreamById = async (orgName: string, spaceName: string, eventName: string, streamId: string): Promise<Stream> => {
        const resp = await this.axios
            .get<Stream>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createStream returns the newly created stream
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param name the name for the new stream
     * @returns event
     */
    public createStream = async (orgName: string, spaceName: string, eventName: string, name: string): Promise<Stream> => {
        const resp = await this.axios
            .post<Stream>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams`), { name: name })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Patch the order all Streams of an event (require WRITE rights)
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param StreamPatchOrder A list of all event streams with their new order
     * @returns Stream[] array of the updated streams
     */
    public patchStreamOrder = async (orgName: string, spaceName: string, eventName: string, streamList: StreamPatchOrder[]): Promise<Stream[]> => {
        const resp = await this.axios
            .patch<Stream[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams`), streamList)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * deleteStreamById delete an stream by its ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     */
    public deleteStreamById = async (orgName: string, spaceName: string, eventName: string, streamId: string): Promise<void> => {
        await this.axios
            .delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}`))
            .catch((err: Error) => {
                throw err;
            });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
