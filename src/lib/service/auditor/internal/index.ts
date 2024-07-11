import Base from "../../../Base";
import { AuditLog } from "../../../interfaces/auditor";

export class AuditorInternal extends Base {
    private queueExecutionInterval: number = this.options.auditor?.queue?.executionInterval || 500;
    private logQueue = [] as AuditLog[];
    private logQueueTimer: ReturnType<typeof setTimeout> | undefined;

    /**
     * Adds log entries.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param logs Array of audit logs
     * @returns Array of audit logs
     * @deprecated Use queueAuditLogs() instead
     */
    public addAuditLogs = async (logs: AuditLog[]): Promise<AuditLog[]> => {
        const resp = await this.axios.post<AuditLog[]>(this.getEndpoint("/v1/logs"), logs);

        return resp.data;
    };

    /**
     * Adds log entries to a queue that will be processed periodically.
     *
     * No exceptions are thrown in case of an error as this function runs periodically asynchronous.
     *
     * This also comes with the downside of log timesstamps being inaccurate as they are created by the Auditor Server.
     * Timestamps might differ as much as: this.options.auditor.queue.executionInterval || 500
     * @param logs array (add multiple logs entries at once)
     */
    public queueAuditLogs = async (logs: AuditLog[]): Promise<void> => {
        if (!this.logQueueTimer) {
            this.startQueue();
        }

        this.logQueue = this.logQueue.concat(logs);
    };

    private startQueue(): void {
        if (!this.logQueueTimer) {
            this.logQueueTimer = setTimeout(() => {
                if (this.logQueue.length > 0) {
                    // DO NOT REMOVE THE IGNORE CATCH AS IT WOULD LEAD TO UNHANDLED PROMISE REJECTION IN OTHER ENDPOINTS AND THEIR CRASH
                    // tslint:disable-next-line
                    this.addAuditLogs(this.logQueue).catch(ignored => ignored);
                    this.logQueue = [] as AuditLog[];
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
    public deleteAllAuditLogsOfOrganization = async (orgId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgId}/logs`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/auditor/internal${endpoint}`;
    }
}