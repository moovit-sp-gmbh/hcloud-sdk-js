import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { High5Space as Space } from "../../../interfaces/high5/space";
import { SearchFilter, SearchParams, SpacePermission } from "../../../interfaces/global";
import { High5Event } from "./event";
import { High5Execute } from "./execute";
import { High5Webhook } from "./webhook";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import High5SpaceSettings from "./settings";

export class High5Space extends Base {
    public event: High5Event;
    public execute: High5Execute;
    public webhook: High5Webhook;
    public settings: High5SpaceSettings;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.event = new High5Event(this.options, this.axios);
        this.execute = new High5Execute(this.options, this.axios);
        this.webhook = new High5Webhook(this.options, this.axios);
        this.settings = new High5SpaceSettings(this.options, this.axios);
    }

    /**
     * Retrieves all High5 Spaces of the specified Organization matching the search filter(s). Will return all Spaces if no search filter is provided.
     * @param orgName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of High5 Spaces and the total number of results found in the database (independent of limit and page)
     */
    public searchSpaces = async ({
        orgName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string }): Promise<[Space[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios
            .post<Space[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/search?page=${page}&limit=${limit}`), {
                filters: filtersDTO,
                sorting: sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves a High5 Space by its name.
     * @param orgName Name of the Organization
     * @param spaceId ID of the High5 Space
     * @returns The requested Space
     */
    public getSpace = async (orgName: string, spaceName: string): Promise<Space> => {
        const resp = await this.axios.get<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Creates a new High5 Space in the specified Organization.
     * @param orgName Name of the Organization
     * @param name Name for the new Space
     * @returns The created Space
     */
    public createSpace = async (orgName: string, name: string): Promise<Space> => {
        const resp = await this.axios.post<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces`), { name: name }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Delete a space by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     */
    public deleteSpace = async (orgName: string, spaceName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * Updates the permission a User has in the specified High5 Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param userId ID of the User
     * @param permission New permission
     * @returns The Space with updated permissions
     */
    public patchUserSpacePermission = async (orgName: string, spaceName: string, userId: string, permission: SpacePermission): Promise<Space> => {
        const resp = await this.axios
            .patch<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permission/user`), { userId, permission })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Updates the permission a Team has in the specified High5 Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param teamName Name of the Team
     * @param permission New permission
     * @returns The Space with updated permissions
     */
    public patchTeamSpacePermission = async (
        orgName: string,
        spaceName: string,
        teamName: string,
        permission: SpacePermission
    ): Promise<High5Space> => {
        const resp = await this.axios
            .patch<High5Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permission/team`), {
                teamName,
                permission,
            })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
