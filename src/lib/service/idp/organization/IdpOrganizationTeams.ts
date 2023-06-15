import base from "../../../base";
import { Team, TeamUsersPatchOperation } from "../../../interfaces/IDP";

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
     * deleteTeam deletes a new team by id
     * @param orgName the organization name
     * @param teamId the id of the team
     * @returns 204 no content
     */
    public deleteTeam = async (orgName: string, teamId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/${orgName}/teams/${teamId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * patchTeam updates parameter of existing team
     * @param orgName the organization name
     * @param teamId the id of the team
     * @param newName (optional) the new name of the team
     * @param userIds (optional) a list of user ids that should be added to or deleted from or set to the team depending on @param usersOperation. Max 1k ids allowed at a time.
     * @param teamUsersPatchOperation (optional) add, set, remove -> that operation will be performed on that array. Not found ids will be ignored
     * @returns The updated team object
     */
    public patchTeam = async (
        orgName: string,
        teamId: string,
        newName?: string,
        userIds?: string[],
        teamUsersPatchOperation?: TeamUsersPatchOperation
    ): Promise<Team> => {
        const resp = await this.axios
            .patch<Team>(this.getEndpoint(`/${orgName}/teams/${teamId}`), { name: newName, users: userIds, usersOperation: teamUsersPatchOperation })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * getTeam get a team by it's id
     * @param orgName the organization name
     * @param teamId the id of the team
     * @returns team object
     */
    public getTeam = async (orgName: string, teamId: string): Promise<Team> => {
        const resp = await this.axios.get<Team>(this.getEndpoint(`/${orgName}/teams/${teamId}`)).catch((err: Error) => {
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

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
