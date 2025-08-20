import Base from "../../../Base";
import { CosmoEvents as ICosmoEvents } from "../../../interfaces/cosmo/event";

/**
 * @class Event
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Event resource in Cosmo, providing methods to interact with the Event API.
 */
export class CosmoEvent extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Get a list of Events available in Cosmo
     * @remarks
     * ** Under development, breaking changes possible**
     * @returns An Object holding all cosmo events sorted
     */
    async getCosmoEvents(): Promise<ICosmoEvents> {
        const resp = await this.axios.get<ICosmoEvents>(this.getEndpoint(`/v1/events`));

        return resp.data;
    }
}
