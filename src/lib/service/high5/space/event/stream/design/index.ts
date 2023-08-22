import Base from "../../../../../../Base";
import { Design } from "../../../../../../interfaces/high5/space/event/stream/design";

export class High5Design extends Base {
    /**
     * Retrieves all designs of the specified stream.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param limit Max number of results (1-100; defaults to 25)
     * @param page Skip the first (page * limit) results (defaults to 0)
     * @returns Array of design objects
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
     * Retrieves a design by its ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param designId ID of the design
     * @returns The requested design
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
     * Creates a new design for the specified stream.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param design Design as Json payload (schema created by Stream Designer Studio)
     * @param build Rendered design as Json payload (schema created by Stream Designer Studio; ready to be executed by wave engine)
     * @returns The created design
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
