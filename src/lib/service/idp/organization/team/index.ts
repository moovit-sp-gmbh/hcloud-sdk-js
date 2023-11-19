import Base from "../../../../Base";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { SearchFilter, SearchParams, Sorting } from "../../../../interfaces/global/SearchFilters";
import { Team, TeamUsersPatchOperation } from "../../../../interfaces/idp/organization/team";
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
            users: userIds,
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
     * Retrieves all Teams of an Organization.
     * @param orgName Name of the Organization
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Teams and the total number of results found in the database (independent of limit and page)
     */
    public listTeams = async (orgName: string, limit?: number, page?: number): Promise<[Team[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios.get<Team[]>(this.getEndpoint(`/${orgName}/teams?limit=${limit}&page=${page}`));

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves all Teams of an Organization that match the provided search filter(s). Returns all Teams if no search filter is provided.
     * @param organizationName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Teams and the total number of results found in the database (independent of limit and page)
     */
    public searchTeams = async (params: {
        organizationName: string;
        filters: SearchFilter[];
        sorting?: Sorting;
        limit?: number;
        page?: number;
    }): Promise<[Team[], number]> => {
        const limit = params.limit || 25;
        const page = params.page || 0;

        const filtersDTO = params.filters.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<Team[]>(this.getEndpoint(`/${params.organizationName}/teams/search?limit=${limit}&page=${page}`), {
            filters: filtersDTO,
            sorting: params.sorting,
        });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves all Members of a Team that match the provided search filter(s). Returns all Members if no search filter is provided.
     * @param organizationName Name of the organization
     * @param teamName Name of the Team
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Team members and the total number of results found in the database (independent of limit and page)
     */
    public searchTeamMembers = async ({
        organizationName,
        teamName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { organizationName: string; teamName: string }): Promise<[(ReducedUser & { email: string })[], number]> => {
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

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
