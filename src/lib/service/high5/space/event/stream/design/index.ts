import Base from "../../../../../../Base";
import { Design } from "../../../../../../interfaces/high5/space/event/stream/design";

export class High5Design extends Base {
    /**
     * Retrieves a stream's design.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @returns The requested design
     */
    public getDesign = async (orgName: string, spaceName: string, eventName: string, streamId: string): Promise<Design> => {
        const resp = await this.axios.get<Design>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design`)
        );

        return resp.data;
    };

    /**
     * Creates/overwrites a new design for the specified stream.
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
        const resp = await this.axios.put<Design>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design`),
            {
                name: name,
                design: design,
                build: build,
            }
        );

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
