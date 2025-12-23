import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { Pool, PoolChange, PoolQueryOptions, PoolTargetPatch } from "../../../../interfaces/high5/space/pool";
import { OrganizationMember } from "../../../../interfaces/idp";

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
    async getPool<R extends boolean = false>(orgName: string, spaceName: string, name: string, raw?: { raw: R }): Promise<MaybeRaw<R, Pool>> {
        const resp = await this.axios.get<Pool>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${name}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Pool>;
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
    async replacePool<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        poolName: string,
        name: string,
        targets: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PoolChange>> {
        const resp = await this.axios.put<PoolChange>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${poolName}`), {
            name,
            targets,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, PoolChange>;
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
    async patchPool<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        poolName: string,
        name?: string,
        targets?: PoolTargetPatch,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PoolChange>> {
        if (name === undefined && targets === undefined) {
            throw new Error("unable to patch pool when there are no arguments to send");
        }
        const resp = await this.axios.patch<PoolChange>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${poolName}`), {
            name,
            targets,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, PoolChange>;
    }

    /**
     * Delete a pool of a space
     *
     * @param orgName   - Name of the organization
     * @param spaceName - Name of the space
     * @param poolName  - Name of the pool
     */
    async deletePool<R extends boolean = false>(orgName: string, spaceName: string, poolName: string, raw?: { raw: R }): Promise<MaybeRaw<R, Pool>> {
        const resp = await this.axios.delete<Pool>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${poolName}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Pool>;
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
    async searchPools<R extends boolean = false>(
        {
            orgName,
            spaceName,
            filters,
            sorting,
            options,
            limit = 25,
            page = 0,
        }: SearchParams & { orgName: string; spaceName: string; options?: PoolQueryOptions },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Pool>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Pool[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/search`),
            {
                filters: filtersDTO,
                sorting: sorting,
            },
            {
                params: {
                    limit,
                    page,
                    totalTargetCount: options?.getTotalTargetCount,
                    targetsSample: options?.getTargetsSample,
                },
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<R, PaginatedResponse<Pool>>;
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
    async addPool<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        name: string,
        targets: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PoolChange>> {
        const resp = await this.axios.post<PoolChange>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools`), { name, targets });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, PoolChange>;
    }

    /**
     * Retrieves all the pools the current user is assigned to as an execution target
     *
     * @returns Array of pools the user is assigned to as execution target
     */
    async getPools<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, Pool[]>> {
        const resp = await this.axios.get<Pool[]>(this.getEndpoint("/v1/pools"));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Pool[]>;
    }

    /**
     * Retrieves all targets of a pool which match the provided search filter(s). Will return all targets of the pool if no filter is provided.
     *
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param poolName Name of the pool
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of OrganizationMember and the total number of results found in the database (independent of limit and page)
     */
    async searchTargetsOfPool<R extends boolean = false>(
        {
            orgName,
            spaceName,
            poolName,
            filters,
            sorting,
            limit = 25,
            page = 0,
        }: SearchParams & { orgName: string; spaceName: string; poolName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<OrganizationMember>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<OrganizationMember[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${poolName}/targets/search`),
            {
                filters: filtersDTO,
                sorting: sorting,
            },
            {
                params: {
                    page,
                    limit,
                },
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<OrganizationMember>
        >;
    }

    /**
     * Updates the avatar of the specified pool
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param name Name of the pool
     * @param file Image as Javascript File
     * @returns Pool details with updated avatar
     */
    async updateAvatar<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        name: string,
        file: File,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Pool>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<Pool>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/pools/${name}/avatar`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Pool>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
