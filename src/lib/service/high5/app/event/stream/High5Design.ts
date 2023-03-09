import { AxiosInstance } from "axios";
import base, { Options } from "../../../../../base";
import { Design, Event, Stream } from "../../../../../interfaces/High5";

export class High5Design extends base {
    /**
     * getDesigns returns all designs for an event
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @param streamId the streams's id
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns Design array
     */
    public getDesigns = async (
        orgName: string,
        appName: string,
        eventName: string,
        streamId: string,
        limit?: number,
        page?: number
    ): Promise<Design[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<Design[]>(
                this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}/streams/${streamId}/designs?page=${page}&limit=${limit}`)
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getStreamById returns a design by its ID
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param designId the design's id
     * @returns Design
     */
    public getDesignById = async (orgName: string, appName: string, eventName: string, streamId: string, designId: string): Promise<Design> => {
        const resp = await this.axios
            .get<Design>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}/streams/${streamId}/designs/${designId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createDesign return the newly created design
     * @param orgName the organizations's name
     * @param appName the apps's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param design design json payload (schema created by Stream Designer Studio)
     * @param build rendered design json payload (schema created by Stream Designer Studio; ready to be executed by wave engine)
     * @returns Design
     */
    public createDesign = async (
        orgName: string,
        appName: string,
        eventName: string,
        streamId: string,
        name: string,
        design: unknown,
        build?: unknown
    ): Promise<Design> => {
        const resp = await this.axios
            .post<Design>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/events/${eventName}/streams/${streamId}/designs`), {
                name: name,
                design: design,
                build: build,
            })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
