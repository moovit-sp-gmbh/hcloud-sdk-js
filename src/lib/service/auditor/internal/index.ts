import Base, { MaybeRaw } from "../../../Base";
import { AuditLogCreate } from "../../../interfaces/auditor";

export class AuditorInternal extends Base {
    private queueExecutionInterval: number = this.options.auditor?.queue?.executionInterval || 500;
    private logQueue = [] as AuditLogCreate[];
    private logQueueInterval: ReturnType<typeof setInterval> | undefined;

    /**
     * Adds log entries to a queue that will be processed periodically.
     *
     * No exceptions are thrown in case of an error as this function runs periodically asynchronous.
     *
     * This also comes with the downside of log timesstamps being inaccurate as they are created by the Auditor Server.
     * Timestamps might differ as much as: this.options.auditor.queue.executionInterval || 500
     * @param logs array (add multiple logs entries at once)
     */
    async queueAuditLogs(logs: AuditLogCreate[]): Promise<void> {
        if (!this.logQueueInterval) {
            this.startQueue();
        }

        this.logQueue = this.logQueue.concat(logs);
    }

    private startQueue(): void {
        if (!this.logQueueInterval) {
            this.logQueueInterval = setInterval(() => {
                if (this.logQueue.length > 0) {
                    // DO NOT REMOVE THE IGNORE CATCH AS IT WOULD LEAD TO UNHANDLED PROMISE REJECTION IN OTHER ENDPOINTS AND THEIR CRASH
                    this.axios.post<void>(this.getEndpoint("/v1/logs"), this.logQueue).catch(ignored => ignored);
                    this.logQueue = [];
                }
            }, this.queueExecutionInterval);
        }
    }

    /**
     * Deletes all audit logs of an organization
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgId the organizations's ID
     * @returns void
     */
    async deleteAllAuditLogsOfOrganization<R extends boolean = false>(orgId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgId}/logs`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Deletes all audit logs of an Asset by space
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgId the organizations's ID
     * @param spaceName the Space's name
     * @returns void
     */
    async deleteAllAuditLogsOfSpace<R extends boolean = false>(orgId: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgId}/spaces/${spaceName}/logs`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Deletes all audit logs of an Asset
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgId the organizations's ID
     * @param assetId the Asset's ID
     * @returns void
     */
    async deleteAllAuditLogsOfAsset<R extends boolean = false>(orgId: string, assetId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgId}/assets/${assetId}/logs`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/auditor/internal${endpoint}`;
    }
}
