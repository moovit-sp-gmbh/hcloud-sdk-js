import axios from "axios";
import base from "../../base";
import { AuditLog } from "../../interfaces/Auditor";

export class AuditorInternal extends base {
    private queueExecutionInterval: number = this.opts.auditor?.queue?.executionInterval || 500;
    private logQueue = [] as AuditLog[];
    private logQueueTimer: ReturnType<typeof setTimeout> | undefined;

    /**
     * AddAuditLogs adds log entries
     *
     * THIS ENDPOINT WORKS INTERNALLY ONLY
     *
     * CAN ONLY BE USED FROM BACKENDS WITHIN THE hcloud DEPLOYMENT AS THE ENDPOINT IS NOT PUBLICLY EXPOSED
     * @param logs array (add multiple logs entries at once)
     * @returns AuditLog array
     */
    public addAuditLogs = async (logs: AuditLog[]): Promise<AuditLog[]> => {
        const resp = await axios.post<AuditLog[]>(this.getEndpoint("/v1/logs"), logs).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * QueueAuditLogs adds log entries to a queue that will be processed periodically
     *
     * no exceptions are thrown in case of an error as this function runs periodically asynchronous
     *
     * THIS COMES WITH DOWNSIDE OF LOG TIMESTAMPS BEING INACCURATE AS THEY ARE CREATED BY THE Auditor SERVER
     *
     * TIMESTAMPS MIGHT DIFFER AS MUCH AS: this.opts.auditor.queue.executionInterval || 500
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
                    // tslint:disable-next-line
                    this.addAuditLogs(this.logQueue).catch(() => {});
                    this.logQueue = [] as AuditLog[];
                }
            }, this.queueExecutionInterval);
        }
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/auditor/internal${endpoint}`;
    }
}
