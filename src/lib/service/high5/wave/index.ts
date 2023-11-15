import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { WaveEngine, WaveEngineReleaseAsset } from "../../../interfaces/high5/wave";
import { S3 } from "./s3";

export class High5Wave extends Base {
    public s3: S3;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.s3 = new S3(this.options, this.axios);
    }

    /**
     * Retrieves all available wave engine release tags (paginated request)
     * @param orgName Name of the Organization
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array holding the WaveEngineReleaseAssets
     */
    public getEngineReleaseTags = async (orgName: string, limit?: number, page?: number): Promise<[WaveEngineReleaseAsset[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios.get<WaveEngineReleaseAsset[]>(this.getEndpoint(`/v1/org/${orgName}/wave/releases?page=${page}&limit=${limit}`));

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves the content of a wave engine (base64 encoded engine.js file with additional parameters)
     * @param orgName Name of the Organization
     * @param releaseVersion Release tag version of the wave engine
     * @returns WaveEngine
     */
    public getWaveEngine = async (orgName: string, releaseVersion: string): Promise<WaveEngine> => {
        const resp = await this.axios.get<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/wave/releases/${releaseVersion}`));

        return resp.data;
    };

    /**
     * Retrieves the content of a wave engines node catalogue (base64 encoded catalogue.json file with additional parameters) for a provided Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @returns WaveEngine
     */
    public getNodeCatalogue = async (orgName: string, spaceName: string): Promise<WaveEngine> => {
        const resp = await this.axios.get<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/wave/spaces/${spaceName}/nodeCatalogue`));

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
