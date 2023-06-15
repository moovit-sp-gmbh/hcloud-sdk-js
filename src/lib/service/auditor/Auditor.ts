import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { AuditLog, AuditLogFilter, Event, Level, Origin, Type } from "../../interfaces/Auditor";
import { Version } from "../../interfaces/Global";
import { AuditorInternal } from "./AuditorInternal";

export default class Auditor extends base {
    public internal: AuditorInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.internal = new AuditorInternal(this.options, this.axios);
    }

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * GetAuditLog requests logs by optional filter and limited to provided organization
     * @param organizationName an optional organization ID to receive audit logs for
     * @param limit an optional response limit (1-100; defaults to 25)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @param filter an optional filter object that holds optional filter fields
     * @returns A list of audit logs
     */
    /* eslint-disable complexity */
    getAuditLogs = async (organizationName: string, limit?: number, page?: number, filter?: AuditLogFilter): Promise<[AuditLog[], Number]> => {
        const parameters = [];
        let paramsUrl = "";

        parameters.push("limit" + limit || 25);
        parameters.push((page = page || 0));

        if (filter) {
            if (filter.origin) parameters.push("origin=" + filter.origin);
            if (filter.level) parameters.push("level=" + filter.level);
            if (filter.event) parameters.push("event=" + filter.event);
            if (filter.type) parameters.push("type=" + filter.type);
            if (filter.timestamp) parameters.push("timestamp=" + filter.timestamp);
            if (filter.message) parameters.push("message=" + filter.message);
            if (filter.userName) parameters.push("userName=" + filter.userName);
        }

        if (parameters.length > 0) paramsUrl = "?" + parameters.join("&");

        const resp = await this.axios.get<AuditLog[]>(this.getEndpoint(`/v1/org/${organizationName}/logs`) + paramsUrl).catch((err: Error) => {
            throw err;
        });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };
    /* eslint-disable complexity */

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/auditor${endpoint}`;
    }
}
