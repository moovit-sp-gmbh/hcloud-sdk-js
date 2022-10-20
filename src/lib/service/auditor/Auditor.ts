import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { AuditLog } from "../../interfaces/Auditor";
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

        const resp = await this.axios.get<AuditLog[]>(this.getEndpoint("/v1/logs") + url, {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/auditor${endpoint}`;
    }
}
