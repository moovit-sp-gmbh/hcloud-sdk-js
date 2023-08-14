import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { WaveEngine, WaveEngineReleaseAsset } from "../../interfaces/high5/Wave";

export class High5Wave extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * getWaveEngineReleaseTags returns all available wave engine release tags
     * @param orgName the organizations's name
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns An array holding WaveEngineReleaseAssets
     */
    public getReleaseTags = async (orgName: string, limit?: number, page?: number): Promise<[WaveEngineReleaseAsset[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios
            .get<WaveEngineReleaseAsset[]>(this.getEndpoint(`/v1/org/${orgName}/wave/releases?page=${page}&limit=${limit}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getWaveEngine returns the content of a wave engine (base64 encoded engine.js file with additional parameters)
     * @param orgName the organizations's name
     * @param releaseVersion the release tag version of the wave engine
     * @returns WaveEngine
     */
    public getWaveEngine = async (orgName: string, releaseVersion: string): Promise<WaveEngine> => {
        const resp = await this.axios.get<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/wave/releases/${releaseVersion}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * getNodeCatalogue returns the content of a wave engines node catalogue (base64 encoded catalogue.json file with additional parameters)
     * @param orgName the organizations's name
     * @param spaceName the space for which the catalogue is requested
     * @returns WaveEngine
     */
    public getNodeCatalogue = async (orgName: string, spaceName: string): Promise<WaveEngine> => {
        const resp = await this.axios
            .get<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/wave/spaces/${spaceName}/nodeCatalogue`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
