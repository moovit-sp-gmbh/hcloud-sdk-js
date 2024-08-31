import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../../Base";
import { Design } from "../../../../../../interfaces/high5/space/event/stream/design";
import { DesignContent } from "../../../../../../interfaces/high5/space/event/stream/design/StreamDesign";
import DesignOperations from "./DesignOperations";
import High5DesignSnapshots from "./snapshot";

export class High5Design extends Base {
    /**
     * API to manage design snapshots
     */
    public snapshots: High5DesignSnapshots;

    /**
     * API to perform operations on the Stream Design
     */
    public operations: DesignOperations;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.operations = new DesignOperations(options, axios);
        this.snapshots = new High5DesignSnapshots(options, axios);
    }

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
     *
     * To publish the current design for execution use the {@link publishDesign} method
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param content Design as Json payload (schema created by Stream Designer Studio)
     * @returns The created design
     */
    public createDesign = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        name: string,
        content: DesignContent
    ): Promise<Design> => {
        const resp = await this.axios.put<Design>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design`),
            {
                name,
                content,
            }
        );

        return resp.data;
    };

    /**
     * Publish the current design for a specified stream
     *
     * To set the current design use the {@link createDesign} method
     *
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param content Design as Json payload (schema created by Stream Designer Studio)
     * @returns The created design
     */
    public publishDesign = async (orgName: string, spaceName: string, eventName: string, streamId: string): Promise<void> => {
        await this.axios.put<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/publish`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
