import base, { Options } from "../base";
import axios from "axios";
import { AuditLog } from "../interfaces/Auditor";
import { Version } from "../interfaces/Global";

export default class Auditor extends base {
    private queueExecutionInterval: number = this.opts.auditor?.queue?.executionInterval || 500;
    private logQueue = [] as AuditLog[];
    private logQueueTimer: ReturnType<typeof setTimeout> | undefined;

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await axios.get<Version>(this.getEndpoint("/v1/version"), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * GetAuditLog requests logs from
     * @param organizationId an optional organization ID to receive audit logs for
     * @param limit an opitional response limit (1-1000; dafaults to 500)
     * @param page an opitional page to skip certain results (page * limit; defaults to 0)
     * @returns User object
     */
    getAuditLogs = async (organizationId: string | null, limit: number | null, page: number | null): Promise<AuditLog[]> => {
        const parameters = [];
        let url = "";

        if (organizationId !== null) {
            parameters.push("organization=" + organizationId);
        }

        if (limit !== null) {
            parameters.push("limit=" + limit);
        }

        if (page !== null) {
            parameters.push("page=" + page);
        }

        if (parameters.length > 0) {
            url = "?" + parameters.join("&");
        }

        const resp = await axios.get<AuditLog[]>(this.getEndpoint("/v1/logs") + url, {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * AddAuditLogs adds log entries
     *
     * THIS ENDPOINT WORKS INTERNALLY ONLY
     *
     * CAN ONLY BE USED FROM BACKENDS WITHIN THE hcloud DEPLOYMENT AS THE ENDPOINT IS NOT PUBLICLY EXPOSED
     * @param logs array (add multiple logs entries at once)
     * @returns AuditLog array
     */
    addAuditLogs = async (logs: AuditLog[]): Promise<AuditLog[]> => {
        const resp = await axios.post<AuditLog[]>(this.getEndpoint("/logs"), logs).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * QueueAuditLogs adds log entries to a queue that will be processed periodically
     *
     * THIS COMES WITH DOWNSIDE OF LOG TIMESTAMPS BEING INACCURATE AS THEY ARE CREATED BY THE Auditor SERVER
     *
     * TIMESTAMPS MIGHT DIFFER AS MUCH AS: this.opts.auditor.queue.executionInterval || 500
     * @param logs array (add multiple logs entries at once)
     */
    queueAuditLogs = async (logs: AuditLog[]): Promise<void> => {
        if (!this.logQueueTimer) {
            this.startQueue();
        }

        this.logQueue = this.logQueue.concat(logs);
    };

    private startQueue(): void {
        if (!this.logQueueTimer) {
            this.logQueueTimer = setTimeout(() => {
                if (this.logQueue.length > 0) {
                    this.addAuditLogs(this.logQueue);
                    this.logQueue = [] as AuditLog[];
                }
            }, this.queueExecutionInterval);
        }
    }

    private getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/auditor${endpoint}`;
    }
}
