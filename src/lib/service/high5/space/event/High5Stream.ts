import { AxiosInstance } from "axios";
import base, { Options } from "../../../../base";
import { Event, Stream, SingleStreamPatchOrder, StreamPatchOrder } from "../../../../interfaces/High5";
import { High5Execute } from "../High5Execute";
import { High5Design } from "./stream/High5Design";
import { High5Node } from "./stream/High5Node";
import { SearchFilter, SearchParams } from "../../../../interfaces/Global";
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
     * @param {SearchParams & { orgName: string, spaceName: string, eventName: string }} params Search parameters
     * @param {string} params.orgName Name of the organization
     * @param {string} params.spaceName Name of the space
     * @param {string} params.eventName Name of the event
     * @param {SearchFilter[]} [params.filters] an array of search filters
     * @param {Sorting} [params.sorting] an optional sorting direction
     * @param {number} [params.limit=25] an optional response limit limit (1-100; defaults to 25)
     * @param {number} [params.page=0] - an optional page to skip certain results (page * limit; defaults to 0)
     * @returns Space array
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
     * getStream returns a stream by its ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @returns Event
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
     * @param appName the apps's name
     * @param eventName the event's name
     * @param StreamPatchOrder A list of all event streams with their new order
     * @returns Stream[] array of the updated streams
     */
    public patchStreamOrderMulti = async (orgName: string, spaceName: string, eventName: string, streamList: StreamPatchOrder[]): Promise<Stream[]> => {
        const resp = await this.axios
            .patch<Stream[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/order`), streamList)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Move an stream up or down in the existing streams order (require WRITE rights)
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the streams's id
     * @param SingleStreamPatchOrder Object defining if stream order increases or decreases
     * @returns Stream[] array of the updated streams
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
     * deleteStream delete an stream by its ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
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
