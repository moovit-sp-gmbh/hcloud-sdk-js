import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { AuditLog, AuditLogFilter, Event, Level, Origin, Type } from "../../interfaces/Auditor";
import { SearchFilter, Sorting, Version } from "../../interfaces/Global";
import { AuditorInternal } from "./AuditorInternal";
import { SearchParams } from "../../interfaces/Global";
import { SearchFilterDTO } from "../../helper/searchFilter";

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
     * Returns all audit logs for an organization which match the search filter
     * @param {SearchParams & { orgName: string, spaceName: string }} params Search parameters
     * @param {string} params.organizationName The name of the organization
     * @param {SearchFilter[]} [params.filters] (optional) An array of search filters
     * @param {Sorting} [params.sorting] (optional) A sorting object
     * @param {number} [params.limit=25] (optional) Max number of results (1-100; defaults to 25)
     * @param {number} [params.page = 0] - (optional) Page number to skip the first page * limit results (defaults to 0)
     * @returns Array of audit logs
     */
    public searchAuditLogs = async ({
        organizationName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { organizationName: string }): Promise<[AuditLog[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios
            .post<AuditLog[]>(this.getEndpoint(`/v1/org/${organizationName}/logs/search?page=${page}&limit=${limit}`), {
                filters: filtersDTO,
                sorting: sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/auditor${endpoint}`;
    }
}
