import Base from "../../Base";
import { createPaginatedResponse } from "../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../helper/searchFilter";
import { AuditLog } from "../../interfaces/auditor";
import { PaginatedResponse, SearchFilter, SearchParams, Version } from "../../interfaces/global";
import { AuditorInternal } from "./internal";

export default class Auditor extends Base {
    public get internal(): AuditorInternal {
        if (this._internal === undefined) {
            this._internal = new AuditorInternal(this.options, this.axios);
        }
        return this._internal;
    }
    private _internal?: AuditorInternal;

    /**
     * @returns An object containing the endpoint version as a string
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return resp.data;
    }

    /**
     * Returns all audit logs for an organization which match the search filter
     * @param organizationName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of audit logs and the total number of results found in the database (independent of limit and page)
     */
    async searchAuditLogs({
        organizationName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { organizationName: string }): Promise<PaginatedResponse<AuditLog>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<AuditLog[]>(this.getEndpoint(`/v1/org/${organizationName}/logs/search?page=${page}&limit=${limit}`), {
            filters: filtersDTO,
            sorting: sorting,
        });

        return createPaginatedResponse(resp) as PaginatedResponse<AuditLog>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/auditor${endpoint}`;
    }
}
