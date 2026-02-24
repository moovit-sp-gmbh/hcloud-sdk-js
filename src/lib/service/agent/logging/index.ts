import Base, { MaybeRaw } from "../../../Base";
import { AddLogCollectorDto, LogCollectorDto } from "../../../interfaces/agent/logging";

export class AgentLogging extends Base {
    /**
     * Retrieves a list of all currently registered and connected external logging destinations.
     * @returns List of active external log collector configurations
     */
    async getLogCollectors<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, LogCollectorDto[]>> {
        const resp = await this.axios.get<LogCollectorDto[]>(this.getEndpoint(`/v1/log-collectors`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, LogCollectorDto[]>;
    }

    /**
     * Registers a new external destination and initializes a persistent Winston HTTP transport for log forwarding.
     * @param collector - The configuration for the new log collector
     * @returns The newly created log collector details
     */
    async addLogCollector<R extends boolean = false>(collector: AddLogCollectorDto, raw?: { raw: R }): Promise<MaybeRaw<R, LogCollectorDto>> {
        const resp = await this.axios.post<LogCollectorDto>(this.getEndpoint(`/v1/log-collectors`), collector);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, LogCollectorDto>;
    }

    /**
     * Retrieves configuration and status information for a specific external log collector by its name.
     * @param name - Unique identifier of the external log collector
     * @returns The requested log collector details
     */
    async getLogCollector<R extends boolean = false>(name: string, raw?: { raw: R }): Promise<MaybeRaw<R, LogCollectorDto>> {
        const resp = await this.axios.get<LogCollectorDto>(this.getEndpoint(`/v1/log-collectors/${name}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, LogCollectorDto>;
    }

    /**
     * Removes an external log destination and immediately terminates the associated Winston transport.
     * @param name - Unique identifier of the external log collector to be deleted
     * @returns void (or raw response)
     */
    async deleteLogCollector<R extends boolean = false>(name: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/log-collectors/${name}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    /**
     * Establishes a persistent Server-Sent Events (SSE) connection to stream logs in real-time.
     * Note: This method returns the raw Axios response because SSE requires stream handling.
     * @param level - Optional filter by severity level
     * @param entity - Optional filter by originating component
     * @returns Raw response with the event stream
     */
    async streamLogs(level?: string, entity?: string): Promise<any> {
        return this.axios.get(this.getEndpoint(`/v1/logs`), {
            params: { level, entity },
            responseType: "stream",
            headers: {
                Accept: "text/event-stream",
            },
        });
    }

    /**
     * Updates the activation status of a specific log collector,
     * this toggles log forwarding to the destination without removing its configuration.
     * @param name - Unique identifier of the external log collector
     * @param enabled - Flag to enable or disable the collector
     * @returns The updated log collector details
     */
    async patchLogCollectorEnabled<R extends boolean = false>(
        name: string,
        enabled: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, LogCollectorDto>> {
        const resp = await this.axios.patch<LogCollectorDto>(this.getEndpoint(`/v1/log-collectors/${name}/enabled`), { enabled });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, LogCollectorDto>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
