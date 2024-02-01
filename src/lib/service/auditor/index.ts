import Base, { Options } from "../../Base";
import { AxiosInstance } from "axios";
import { AuditLog } from "../../interfaces/auditor";
import { PaginatedResponse, SearchFilter, SearchParams, Version } from "../../interfaces/global";
import { AuditorInternal } from "./internal";
import { SearchFilterDTO } from "../../helper/searchFilter";
import { createPaginatedResponse } from "../../helper/paginatedResponseHelper";

export default class Auditor extends Base {
    public internal: AuditorInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.internal = new AuditorInternal(this.options, this.axios);
    }

    /**
     * @returns An object containing the endpoint version as a string
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return resp.data;
    };

    /**
     * Returns all audit logs for an organization which match the search filter
     * @param organizationName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of audit logs and the total number of results found in the database (independent of limit and page)
     */
    public searchAuditLogs = async ({
        organizationName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { organizationName: string }): Promise<PaginatedResponse<AuditLog>> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<AuditLog[]>(this.getEndpoint(`/v1/org/${organizationName}/logs/search?page=${page}&limit=${limit}`), {
            filters: filtersDTO,
            sorting: sorting,
        });

        return createPaginatedResponse(resp) as PaginatedResponse<AuditLog>;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/auditor${endpoint}`;
    }
}
