import base from "../../../base";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import { SearchFilter, SearchParams, Sorting } from "../../../interfaces/global/searchFilters";
import { ReducedUser, Team, TeamUsersPatchOperation } from "../../../interfaces/IDP";

export class IdpOrganizationTeams extends base {
    /**
     * createTeam creates a new team
     * @param orgName the organization name
     * @param teamName the name of the team
     * @param userIds a list of user ids that should be added to the team
     * @returns The created team object
     */
    public createTeam = async (orgName: string, teamName: string, userIds: string[]): Promise<Team[]> => {
        const resp = await this.axios.post<Team[]>(this.getEndpoint(`/${orgName}/teams`), { name: teamName, users: userIds }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteTeam deletes a new team by name
     * @param orgName the organization name
     * @param teamName the name of the team
     * @returns 204 no content
     */
    public deleteTeam = async (orgName: string, teamName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/${orgName}/teams/${teamName}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * patchTeam updates parameter of existing team
     * @param orgName the organization name
     * @param teamName the name of the team
     * @param newName (optional) the new name of the team
     * @param userIds (optional) a list of user ids that should be added to or deleted from or set to the team depending on @param usersOperation. Max 1k ids allowed at a time.
     * @param teamUsersPatchOperation (optional) add, set, remove -> that operation will be performed on that array. Not found ids will be ignored
     * @returns The updated team object
     */
    public patchTeam = async (
        orgName: string,
        teamName: string,
        newName?: string,
        userIds?: string[],
        teamUsersPatchOperation?: TeamUsersPatchOperation
    ): Promise<Team> => {
        const resp = await this.axios
            .patch<Team>(this.getEndpoint(`/${orgName}/teams/${teamName}`), {
                name: newName,
                users: userIds,
                usersOperation: teamUsersPatchOperation,
            })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getTeam get a team by it's name
     * @param orgName the organization name
     * @param teamName the name of the team
     * @returns team object
     */
    public getTeam = async (orgName: string, teamName: string): Promise<Team> => {
        const resp = await this.axios.get<Team>(this.getEndpoint(`/${orgName}/teams/${teamName}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * listTeams list all teams of an organization
     * @param orgName the organization name
     * @param limit an optional response limit limit (1-100; defaults to 25)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns a list of team objects
     */
    public listTeams = async (orgName: string, limit?: number, page?: number): Promise<[Team[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios.get<Team[]>(this.getEndpoint(`/${orgName}/teams?limit=${limit}&page=${page}`)).catch((err: Error) => {
            throw err;
        });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * searchTeams requests teams for an organization using one or more search filters
     * @param params.organizationName Name of the organization
     * @param params.filters an array of search filters
     * @param params.sorting an optional sorting direction
     * @param params.limit an optional response limit limit (1-100; defaults to 25)
     * @param params.page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns Organization array
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

        // convert SearchFilters to DTO
        const filtersDTO = params.filters.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios
            .post<Team[]>(this.getEndpoint(`/${params.organizationName}/teams/search?limit=${limit}&page=${page}`), {
                filters: filtersDTO,
                sorting: params.sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * searchTeamMembers search for members of a team using one or more search filters
     * @param {SearchParams & { organizationName: string, teamName: string }} params Search parameters
     * @param {string} params.organizationName Name of the organization
     * @param {string} params.teamName Name of the team
     * @param {SearchFilter[]} [params.filters] an array of search filters
     * @param {Sorting} [params.sorting] an optional sorting direction
     * @param {number} [params.limit=25] an optional response limit limit (1-100; defaults to 25)
     * @param {number} [params.page=0] - an optional page to skip certain results (page * limit; defaults to 0)
     * @returns ReducedUser + email array
     */
    public searchTeamMembers = async ({
        organizationName,
        teamName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { organizationName: string; teamName: string }): Promise<[(ReducedUser & { email: string })[], number]> => {
        // convert SearchFilters to DTO
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios
            .post<(ReducedUser & { email: string })[]>(
                this.getEndpoint(`/${organizationName}/teams/${teamName}/members/search?limit=${limit}&page=${page}`),
                {
                    filters: filtersDTO,
                    sorting: sorting,
                }
            )
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
