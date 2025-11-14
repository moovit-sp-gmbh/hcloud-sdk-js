import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../../Base";
import { ToggleDevBundle } from "../../../../interfaces/agent/bundle/dev";

export class DevBundle extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves the current dev bundle state.
     * @returns The current dev bundle state
     */
    async getDevBundleState<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, ToggleDevBundle>> {
        const resp = await this.axios.get<ToggleDevBundle>(this.getEndpoint(`/v1/bundle/dev`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ToggleDevBundle>;
    }

    /**
     * Update the dev bundle state.
     * @returns 204 - No content
     */
    async updateDevBundleState<R extends boolean = false>(allowDev: boolean, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post<void>(this.getEndpoint(`/v1/bundle/dev`), {
            allowDev,
        } as ToggleDevBundle);

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    async getCurrentVersion<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.get(this.getEndpoint("/v1/bundle/version"));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    async setCurrentVersion<R extends boolean = false>(version: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.put(
            this.getEndpoint("/v1/bundle/version"),
            { version },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    async restart<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post(this.getEndpoint("/v1/bundle/restart"));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
