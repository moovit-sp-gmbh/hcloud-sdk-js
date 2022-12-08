import { AxiosInstance } from "axios";
import base, { Options } from "../../../../../base";
import { Design, Event, Stream } from "../../../../../interfaces/High5";

export class High5Design extends base {
    /**
     * getDesigns returns all designs for an event
     * @param streamId the streams's id
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns Design array
     */
    public getDesigns = async (streamId: string, limit?: number, page?: number): Promise<Design[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<Design[]>(this.getEndpoint(`/v1/design/list/${streamId}?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getStreamById returns a design by its ID
     * @param designId the design's id
     * @returns Design
     */
    public getDesignById = async (designId: string): Promise<Design> => {
        const resp = await this.axios.get<Design>(this.getEndpoint(`/v1/design/${designId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createDesign return the newly created design
     * @param streamId the stream's id the design should be created for
     * @param design design json payload (schema created by Stream Designer Studio)
     * @param build rendered design json payload (schema created by Stream Designer Studio; ready to be executed by wave engine)
     * @returns Design
     */
    public createDesign = async (streamId: string, name: string, design: any, build?: any): Promise<Design> => {
        const resp = await this.axios
            .post<Design>(this.getEndpoint(`/v1/design/${streamId}`), { name: name, design: design, build: build })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
