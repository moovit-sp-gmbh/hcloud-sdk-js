import Base from "../../../Base";
import { AuditLogCreate } from "../../../interfaces/auditor";

export class AuditorInternal extends Base {
    private queueExecutionInterval: number = this.options.auditor?.queue?.executionInterval || 500;
    private logQueue = [] as AuditLogCreate[];
    private logQueueTimer: ReturnType<typeof setTimeout> | undefined;

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
        if (!this.logQueueTimer) {
            this.startQueue();
        }

        this.logQueue = this.logQueue.concat(logs);
    }

    private startQueue(): void {
        if (!this.logQueueTimer) {
            this.logQueueTimer = setTimeout(() => {
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
    async deleteAllAuditLogsOfOrganization(orgId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgId}/logs`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/auditor/internal${endpoint}`;
    }
}
