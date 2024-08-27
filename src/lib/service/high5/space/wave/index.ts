import { AxiosInstance } from "axios"
import Base, { Options } from "../../../../Base"
import { SpacePatchWaveCatalog, SpacePatchWaveEngine, WaveCatalog, WaveEngine } from "../../../../interfaces/high5"

export default class High5Wave extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Patch wave engine version for a space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param spacePatchWaveEngine - Patch wave engine object holding url and version
     * @returns WaveEngine object
     */
    public patchSpaceWaveEngine = async (orgName: string, spaceName: string, spacePatchWaveEngine: SpacePatchWaveEngine): Promise<WaveEngine> => {
        const resp = await this.axios.patch<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/engine`), spacePatchWaveEngine);

        return resp.data;
    };

    /**
     * Get wave engine version currently active for the space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @returns WaveEngine object
     */
    public getSpaceWaveEngine = async (orgName: string, spaceName: string): Promise<WaveEngine> => {
        const resp = await this.axios.get<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/engine`));

        return resp.data;
    };

    /**
     * Adds a new wave catalog version for a space or updates existing
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param spacePatchWaveCatalog - Patch wave catalog object holding url and version
     * @returns WaveCatalog object
     */
    public addUpdateSpaceWaveCatalog = async (orgName: string, spaceName: string, spacePatchCatalog: SpacePatchWaveCatalog): Promise<WaveCatalog> => {
        const resp = await this.axios.post<WaveCatalog>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/catalog`), spacePatchCatalog);

        return resp.data;
    };

    /**
     * Get wave catalogs currently active for the space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @returns WaveCatalog array
     */
    public getSpaceWaveCatalogs = async (orgName: string, spaceName: string): Promise<WaveCatalog[]> => {
        const resp = await this.axios.get<WaveCatalog[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/catalog`));

        return resp.data;
    };

    public deleteSpaceWaveCatalog = async (orgName: string, spaceName: string, catalogUrl: string): Promise<void> => {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/catalog?catalogUrl=${encodeURIComponent(catalogUrl)}`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
