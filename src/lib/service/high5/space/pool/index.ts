import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { Pool, PoolChange, PoolTargetPatch } from "../../../../interfaces/high5/space/pool";

export default class High5Pool extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Get a pool from a space
     *
     * @param orgName   - Name of the organization
     * @param spaceName - Name of the space
     * @param name      - Name of the pool
     * @returns Pool
     */
    async getPool(orgName: string, spaceName: string, name: string): Promise<Pool> {
        const resp = await this.axios.get<Pool>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${name}`));

        return resp.data;
    }

    /**
     * Replace a pool of a space
     *
     * @param orgName   - Name of the organization
     * @param spaceName - Name of the space
     * @param poolName  - Name of the old/current pool
     * @param name      - New name for the pool
     * @param targets   - Execution targets that compromise the pool
     * @returns The new Pool
     */
    async replacePool(orgName: string, spaceName: string, poolName: string, name: string, targets: string[]): Promise<PoolChange> {
        const resp = await this.axios.put<PoolChange>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${poolName}`), {
            name,
            targets,
        });

        return resp.data;
    }

    /**
     * Patch a pool of a space
     *
     * @param orgName   - Name of the organization
     * @param spaceName - Name of the space
     * @param poolName  - Name of the pool
     * @param name      - New name for the pool
     * @param targets   - Execution targets that compromise the pool
     * @returns The patched Pool
     */
    async patchPool(orgName: string, spaceName: string, poolName: string, name?: string, targets?: PoolTargetPatch): Promise<PoolChange> {
        if (name === undefined && targets === undefined) {
            throw new Error("unable to patch pool when there are no arguments to send");
        }
        const resp = await this.axios.patch<PoolChange>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${poolName}`), {
            name,
            targets,
        });

        return resp.data;
    }

    /**
     * Delete a pool of a space
     *
     * @param orgName   - Name of the organization
     * @param spaceName - Name of the space
     * @param poolName  - Name of the pool
     */
    async deletePool(orgName: string, spaceName: string, poolName: string): Promise<void> {
        await this.axios.delete<Pool>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${poolName}`));
    }

    /**
     * Retrieves all pools of a High5 Space which match the provided search filter(s). Will return all pools of the Space if no filter is provided.
     *
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Pool and the total number of results found in the database (independent of limit and page)
     */
    async searchPools({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<PaginatedResponse<Pool>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Pool[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<Pool>;
    }

    /**
     * Add a pool to a space
     *
     * @param orgName   - Name of the organization
     * @param spaceName - Name of the space
     * @param name      - Name of the pool
     * @param targets   - Execution targets that compromise the pool
     * @returns The created Pool
     */
    async addPool(orgName: string, spaceName: string, name: string, targets: string[]): Promise<PoolChange> {
        const resp = await this.axios.post<PoolChange>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools`), { name, targets });

        return resp.data;
    }

    /**
     * Retrieves all the pools the current user is assigned to as an execution target
     *
     * @returns Array of pools the user is assigned to as execution target
     */
    async getPools(): Promise<Pool[]> {
        const resp = await this.axios.get<Pool[]>(this.getEndpoint("/v1/pools"));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
