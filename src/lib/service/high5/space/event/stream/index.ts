import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { Stream, SingleStreamPatchOrder, StreamPatchOrder } from "../../../../../interfaces/high5/space/event/stream";
import { High5Design } from "./design";
import { High5Node } from "./node";
import { SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";

export class High5Stream extends Base {
    public design: High5Design;
    public node: High5Node;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.design = new High5Design(this.options, this.axios);
        this.node = new High5Node(this.options, this.axios);
    }

    /**
     * Retrieves all Streams of an Event which match the provided search filter(s). Will return all Streams if no filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of streams as well as the total number of results found in the database (independent of limit and page)
     */
    public searchStreams = async ({
        orgName,
        spaceName,
        eventName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string; eventName: string }): Promise<[Stream[], number]> => {
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
     * Retrieves a Stream by its ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @returns The requested stream
     */
    public getStream = async (orgName: string, spaceName: string, eventName: string, streamId: string): Promise<Stream> => {
        const resp = await this.axios
            .get<Stream>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Creates a new Stream for the specified Event.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param name Name for the new stream
     * @returns The created stream
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
     * Patches the order of Streams for an Event.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param StreamPatchOrder List of all event streams with their new order
     * @returns Array of updated Streams
     */
    public patchStreamOrderMulti = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamList: StreamPatchOrder[]
    ): Promise<Stream[]> => {
        const resp = await this.axios
            .patch<Stream[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/order`), streamList)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Moves a Stream up or down in the existing Streams order.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param SingleStreamPatchOrder Object defining if stream should move up or down
     * @returns Array of updated Streams
     */
    public patchStreamOrder = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        singleStreamPatchOrder: SingleStreamPatchOrder
    ): Promise<Stream[]> => {
        const resp = await this.axios
            .patch<Stream[]>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/order`),
                singleStreamPatchOrder
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Deletes a Stream by its ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     */
    public deleteStream = async (orgName: string, spaceName: string, eventName: string, streamId: string): Promise<void> => {
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