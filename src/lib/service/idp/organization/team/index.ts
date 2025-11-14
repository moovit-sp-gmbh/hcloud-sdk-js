import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams, Sorting } from "../../../../interfaces/global";
import { Team, TeamQueryOptions, TeamUsersPatchOperation } from "../../../../interfaces/idp/organization/team";
import { ReducedUser } from "../../../../interfaces/idp/user";

export class IdpOrganizationTeams extends Base {
    /**
     * Creates a new Team in the specified Organization.
     * @param orgName Name of the Organization
     * @param teamName Name of the Team
     * @param userIds List of User IDs to be added to the Team
     * @returns The created Team
     */
    async createTeam<R extends boolean = false>(orgName: string, teamName: string, userIds: string[], raw?: { raw: R }): Promise<MaybeRaw<R, Team>> {
        const resp = await this.axios.post<Team>(this.getEndpoint(`/${orgName}/teams`), { name: teamName, userIds: userIds });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Team>;
    }

    /**
     * Deletes a Team.
     * @param orgName Name of the Organization
     * @param teamName Name of the Team
     */
    async deleteTeam<R extends boolean = false>(orgName: string, teamName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/${orgName}/teams/${teamName}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Updates an existing Team.
     * @param orgName Name of the Organization
     * @param teamName Name of the Team
     * @param newName (optional) New Team name
     * @param userIds (optional) List of user IDs to be added to, deleted from or set to the Team depending on the parameter 'teamUserPatchOperation'
     * @param teamUsersPatchOperation (optional) Enum describing what operation shall be executed: Add, set or remove
     * @returns The updated Team object
     */
    async patchTeam<R extends boolean = false>(
        orgName: string,
        teamName: string,
        newName?: string,
        userIds?: string[],
        teamUsersPatchOperation?: TeamUsersPatchOperation,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Team>> {
        const resp = await this.axios.patch<Team>(this.getEndpoint(`/${orgName}/teams/${teamName}`), {
            name: newName,
            userIds: userIds,
            usersOperation: teamUsersPatchOperation,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Team>;
    }

    /**
     * Retrieve a Team by its name.
     * @param orgName Name of the Organization
     * @param teamName Name of the Team
     * @returns The requested Team
     */
    async getTeam<R extends boolean = false>(orgName: string, teamName: string, raw?: { raw: R }): Promise<MaybeRaw<R, Team>> {
        const resp = await this.axios.get<Team>(this.getEndpoint(`/${orgName}/teams/${teamName}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Team>;
    }

    /**
     * Retrieves all Teams of an Organization that match the provided search filter(s). Returns all Teams if no search filter is provided.
     * @param organizationName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param options (optional) Defines query options to retrieve additional properties for the returned Team objects.
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Teams and the total number of results found in the database (independent of limit and page)
     */
    async searchTeams<R extends boolean = false>(
        params: {
            organizationName: string;
            filters: SearchFilter[];
            sorting?: Sorting;
            options?: TeamQueryOptions;
            limit?: number;
            page?: number;
        },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Team>>> {
        const limit = params.limit || 25;
        const page = params.page || 0;
        const getTotalMemberCount = params.options?.getTotalMemberCount ? `&totalMemberCount=${params.options.getTotalMemberCount}` : "";
        const getMembersSample = params.options?.getMembersSample ? `&membersSample=${params.options.getMembersSample}` : "";

        const filtersDTO = params.filters.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<Team[]>(
            this.getEndpoint(`/${params.organizationName}/teams/search?limit=${limit}&page=${page}` + getMembersSample + getTotalMemberCount),
            {
                filters: filtersDTO,
                sorting: params.sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<R, PaginatedResponse<Team>>;
    }

    /**
     * Retrieves all Members of a Team that match the provided search filter(s). Returns all Members if no search filter is provided.
     * @param organizationName Name of the organization
     * @param teamName Name of the Team
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Team members and the total number of results found in the database (independent of limit and page)
     */
    async searchTeamMembers<R extends boolean = false>(
        { organizationName, teamName, filters, sorting, limit = 25, page = 0 }: SearchParams & { organizationName: string; teamName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<ReducedUser & { email: string }>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<(ReducedUser & { email: string })[]>(
            this.getEndpoint(`/${organizationName}/teams/${teamName}/members/search?limit=${limit}&page=${page}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<ReducedUser & { email: string }>
        >;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
