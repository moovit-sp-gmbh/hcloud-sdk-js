import Base, { MaybeRaw } from "../../../Base";
import { ModuleDto } from "../../../interfaces/agent/module";

export class AgentModule extends Base {
    /**
     * Retrieves a list of all loaded modules available in the agent.
     * @returns A list of modules metadata
     */
    async listModules<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, ModuleDto[]>> {
        const resp = await this.axios.get<ModuleDto[]>(this.getEndpoint(`/v1/management/modules`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ModuleDto[]>;
    }

    /**
     * Creates a new module template based on the received metadata.
     * @param module - Metadata for the new module template
     * @returns Newly created module data
     */
    async addModule<R extends boolean = false>(module: ModuleDto, raw?: { raw: R }): Promise<MaybeRaw<R, ModuleDto>> {
        const resp = await this.axios.post<ModuleDto>(this.getEndpoint(`/v1/management/modules`), module);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ModuleDto>;
    }

    /**
     * Retrieves detailed information about a specific module by its name.
     * @param modName - Unique name identifier of the module
     * @returns Requested module details
     */
    async getModule<R extends boolean = false>(modName: string, raw?: { raw: R }): Promise<MaybeRaw<R, ModuleDto>> {
        const resp = await this.axios.get<ModuleDto>(this.getEndpoint(`/v1/management/modules/${modName}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ModuleDto>;
    }

    /**
     * Removes the module from the agent by its name.
     * @param modName - Unique name identifier of the module to be deleted
     * @returns void (or raw response)
     */
    async deleteModule<R extends boolean = false>(modName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/management/modules/${modName}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
