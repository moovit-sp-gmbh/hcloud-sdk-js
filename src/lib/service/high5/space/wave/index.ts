import Base, { MaybeRaw } from "../../../../Base";
import { SpacePatchWaveCatalog, SpacePatchWaveEngine, WaveCatalog, WaveEngine } from "../../../../interfaces/high5";

export default class High5Wave extends Base {
    /**
     * Patch wave engine version for a space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param spacePatchWaveEngine - Patch wave engine object holding url and version
     * @returns WaveEngine object
     */
    async patchSpaceWaveEngine<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        spacePatchWaveEngine: SpacePatchWaveEngine,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, WaveEngine>> {
        const resp = await this.axios.patch<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/engine`), spacePatchWaveEngine);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WaveEngine>;
    }

    /**
     * Get wave engine version currently active for the space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @returns WaveEngine object
     */
    async getSpaceWaveEngine<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, WaveEngine>> {
        const resp = await this.axios.get<WaveEngine>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/engine`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WaveEngine>;
    }

    /**
     * Adds a new wave catalog version for a space or updates existing
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param spacePatchWaveCatalog - Patch wave catalog object holding url, version and optionally a minimumEngineVersion
     * @returns WaveCatalog object
     */
    async addUpdateSpaceWaveCatalog<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        spacePatchCatalog: SpacePatchWaveCatalog,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, WaveCatalog>> {
        const resp = await this.axios.post<WaveCatalog>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/catalog`), spacePatchCatalog);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WaveCatalog>;
    }

    /**
     * Get wave catalogs currently active for the space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @returns WaveCatalog array
     */
    async getSpaceWaveCatalogs<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, WaveCatalog[]>> {
        const resp = await this.axios.get<WaveCatalog[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/catalog`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WaveCatalog[]>;
    }

    async deleteSpaceWaveCatalog<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        catalogId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/wave/catalog/${catalogId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
