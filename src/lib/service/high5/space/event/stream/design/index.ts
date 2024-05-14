import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../../Base";
import { Design } from "../../../../../../interfaces/high5/space/event/stream/design";
import DesignOperations from "./DesignOperations";
import High5DesignSnapshots from "./snapshot";
import { DesignContent } from "../../../../../../interfaces/high5/space/event/stream/design/StreamDesign";

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
     * @param designAsGzip (optional) Defines if the response should be gzipped
     * @returns The requested design
     */
    public getDesign = async (orgName: string, spaceName: string, eventName: string, streamId: string, designAsGzip?: boolean): Promise<Design> => {
        let resp;
        if (!designAsGzip) {
            resp = await this.axios.get<Design>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design`)
            );
        } else {
            resp = await this.axios.get<Design>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/gzip`)
            );
        }
        return resp.data;
    };

    /**
     * Creates/overwrites a new design for the specified stream.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param content Design as Json payload (schema created by Stream Designer Studio)
     * @param build Rendered design as Json payload (schema created by Stream Designer Studio; ready to be executed by wave engine)
     * @returns The created design
     */
    public createDesign = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        name: string,
        content: DesignContent,
        build?: unknown
    ): Promise<Design> => {
        const resp = await this.axios.put<Design>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design`),
            {
                name,
                content,
                build,
            }
        );
        return resp.data;
    };

    /**
     * Creates/overwrites a new design for the specified stream using gzipped payload.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param eventName Name of the event
     * @param streamId ID of the stream
     * @param design {@link DesignPatchContent} as Gzip payload
     * @returns The created design
     */
    public createDesignGzip = async (
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        design: Buffer | Blob
    ): Promise<Design> => {
        const resp = await this.axios.put<Design>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/gzip`),
            design,
            {
                headers: {
                    "Content-Type": "application/gzip",
                },
            }
        );

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
