import base from "../../../../../base";
import { Design } from "../../../../../interfaces/high5/space/event/stream/design/Design";

export class High5Design extends base {
    /**
     * getAllDesigns returns all designs for an event
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the streams's id
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns Design array
     */
    public getAllDesigns = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        limit?: number,
        page?: number
    ): Promise<Design[]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios
            .get<Design[]>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/designs?page=${page}&limit=${limit}`)
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getDesign returns a design by its ID
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param designId the design's id
     * @returns Design
     */
    public getDesign = async (orgName: string, spaceName: string, eventName: string, streamId: string, designId: string): Promise<Design> => {
        const resp = await this.axios
            .get<Design>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/designs/${designId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * createDesign return the newly created design
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param design design json payload (schema created by Stream Designer Studio)
     * @param build rendered design json payload (schema created by Stream Designer Studio; ready to be executed by wave engine)
     * @returns Design
     */
    public createDesign = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        name: string,
        design: unknown,
        build?: unknown
    ): Promise<Design> => {
        const resp = await this.axios
            .post<Design>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/designs`), {
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
