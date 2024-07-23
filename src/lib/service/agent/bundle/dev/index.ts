import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { ToggleDevBundle } from "../../../../interfaces/agent/bundle/dev";

export class DevBundle extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves the current dev bundle state.
     * @returns The current dev bundle state
     */
    public getDevBundleState = async (): Promise<ToggleDevBundle> => {
        const resp = await this.axios.get<ToggleDevBundle>(this.getEndpoint(`/v1/bundle/dev`));
        return resp.data;
    };

    /**
     * Update the dev bundle state.
     * @returns 204 - No content
     */
    public updateDevBundleState = async (allowDev: boolean): Promise<void> => {
        const resp = await this.axios.post<void>(this.getEndpoint(`/v1/bundle/dev`), {
            allowDev,
        } as ToggleDevBundle);

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
