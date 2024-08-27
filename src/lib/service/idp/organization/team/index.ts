import Base from "../../../../Base";
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
    public createTeam = async (orgName: string, teamName: string, userIds: string[]): Promise<Team> => {
        const resp = await this.axios.post<Team>(this.getEndpoint(`/${orgName}/teams`), { name: teamName, userIds: userIds });

        return resp.data;
    };

    /**
     * Deletes a Team.
     * @param orgName Name of the Organization
     * @param teamName Name of the Team
     */
    public deleteTeam = async (orgName: string, teamName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/${orgName}/teams/${teamName}`));
    };

    /**
     * Updates an existing Team.
     * @param orgName Name of the Organization
     * @param teamName Name of the Team
     * @param newName (optional) New Team name
     * @param userIds (optional) List of user IDs to be added to, deleted from or set to the Team depending on the parameter 'teamUserPatchOperation'
     * @param teamUsersPatchOperation (optional) Enum describing what operation shall be executed: Add, set or remove
     * @returns The updated Team object
     */
    public patchTeam = async (
        orgName: string,
        teamName: string,
        newName?: string,
        userIds?: string[],
        teamUsersPatchOperation?: TeamUsersPatchOperation
    ): Promise<Team> => {
        const resp = await this.axios.patch<Team>(this.getEndpoint(`/${orgName}/teams/${teamName}`), {
            name: newName,
            userIds: userIds,
            usersOperation: teamUsersPatchOperation,
        });

        return resp.data;
    };

    /**
     * Retrieve a Team by its name.
     * @param orgName Name of the Organization
     * @param teamName Name of the Team
     * @returns The requested Team
     */
    public getTeam = async (orgName: string, teamName: string): Promise<Team> => {
        const resp = await this.axios.get<Team>(this.getEndpoint(`/${orgName}/teams/${teamName}`));

        return resp.data;
    };

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
    public searchTeams = async (params: {
        organizationName: string;
        filters: SearchFilter[];
        sorting?: Sorting;
        options?: TeamQueryOptions;
        limit?: number;
        page?: number;
    }): Promise<PaginatedResponse<Team>> => {
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

        return createPaginatedResponse(resp) as PaginatedResponse<Team>;
    };

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
    public searchTeamMembers = async ({
        organizationName,
        teamName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { organizationName: string; teamName: string }): Promise<PaginatedResponse<ReducedUser & { email: string }>> => {
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

        return createPaginatedResponse(resp) as PaginatedResponse<ReducedUser & { email: string }>;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
