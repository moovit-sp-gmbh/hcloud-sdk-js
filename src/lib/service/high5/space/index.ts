import Base from "../../../Base";
import { createPaginatedResponse } from "../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../interfaces/global";
import { Stream } from "../../../interfaces/high5";
import {
    High5Space as Space,
    High5SpaceEntityPermission as SpaceEntityPermission,
    High5SpacePermission as SpacePermission,
} from "../../../interfaces/high5/space";
import { High5Event } from "./event";
import { High5SpaceExecute } from "./execution";
import High5Node from "./node";
import High5Pool from "./pool";
import High5Secret from "./secret";
import High5Wave from "./wave";
import { High5Webhook } from "./webhook";

export class High5Space extends Base {
    public get event(): High5Event {
        if (this._event === undefined) {
            this._event = new High5Event(this.options, this.axios);
        }
        return this._event;
    }
    private _event?: High5Event;
    public get execute(): High5SpaceExecute {
        if (this._execute === undefined) {
            this._execute = new High5SpaceExecute(this.options, this.axios);
        }
        return this._execute;
    }
    private _execute?: High5SpaceExecute;
    public get webhook(): High5Webhook {
        if (this._webhook === undefined) {
            this._webhook = new High5Webhook(this.options, this.axios);
        }
        return this._webhook;
    }
    private _webhook?: High5Webhook;
    public get secret(): High5Secret {
        if (this._secret === undefined) {
            this._secret = new High5Secret(this.options, this.axios);
        }
        return this._secret;
    }
    private _secret?: High5Secret;
    public get pool(): High5Pool {
        if (this._pool === undefined) {
            this._pool = new High5Pool(this.options, this.axios);
        }
        return this._pool;
    }
    private _pool?: High5Pool;
    public get wave(): High5Wave {
        if (this._wave === undefined) {
            this._wave = new High5Wave(this.options, this.axios);
        }
        return this._wave;
    }
    private _wave?: High5Wave;
    public get node(): High5Node {
        if (this._node === undefined) {
            this._node = new High5Node(this.options, this.axios);
        }
        return this._node;
    }
    private _node?: High5Node;

    /**
     * Retrieves all High5 Spaces of the specified Organization matching the search filter(s). Will return all Spaces if no search filter is provided.
     * @param orgName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of High5 Spaces and the total number of results found in the database (independent of limit and page)
     */
    async searchSpaces({ orgName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string }): Promise<PaginatedResponse<Space>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Space[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/search?page=${page}&limit=${limit}`), {
            filters: filtersDTO,
            sorting: sorting,
        });

        return createPaginatedResponse(resp) as PaginatedResponse<Space>;
    }

    /**
     * Retrieves permissions of a space matching the search filter(s). Will return all permissions of the space if no search filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of High5 Space Permissions and the total number of results found in the database (independent of limit and page)
     */
    async searchSpacePermissions({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<PaginatedResponse<SpaceEntityPermission>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<SpaceEntityPermission[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<SpaceEntityPermission>;
    }

    /**
     * Retrieves a High5 Space by its name.
     * @param orgName Name of the Organization
     * @param spaceId ID of the High5 Space
     * @returns The requested Space
     */
    async getSpace(orgName: string, spaceName: string): Promise<Space> {
        const resp = await this.axios.get<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));

        return resp.data;
    }

    /**
     * Creates a new High5 Space in the specified Organization.
     * @param orgName Name of the Organization
     * @param name Name for the new Space
     * @param enableDev (optional) Specifies to the front-end whether to display the versions in the development of Wave Engines and Node Catalogs
     * @returns The created Space
     */
    async createSpace(orgName: string, name: string, enableDev?: boolean): Promise<Space> {
        const resp = await this.axios.post<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces`), { name, enableDev: Boolean(enableDev) });

        return resp.data;
    }

    /**
     * Delete a space by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     */
    async deleteSpace(orgName: string, spaceName: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));
    }

    /**
     * Adds/Updates/Removes the permission a user has in the specified space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param userId ID of the User
     * @param permission New permission
     * @returns The Space with updated permissions
     */
    async updateUserSpacePermission(orgName: string, spaceName: string, userId: string, permission: SpacePermission): Promise<SpaceEntityPermission> {
        const resp = await this.axios.put<SpaceEntityPermission>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions/user`), {
            userId,
            permission,
        });

        return resp.data;
    }

    /**
     * Adds/Updates/Removes the permission a team has in the specified space. Note: A team cannot be an owner of a Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param teamName Name of the Team
     * @param permission New permission
     * @returns The Space with updated permissions
     */
    async updateTeamSpacePermission(
        orgName: string,
        spaceName: string,
        teamName: string,
        permission: SpacePermission
    ): Promise<SpaceEntityPermission> {
        const resp = await this.axios.put<SpaceEntityPermission>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions/team`), {
            teamName,
            permission,
        });

        return resp.data;
    }

    /**
     * Retrieves all streams of a space matching the search filter(s). Will return all streams if no search filter is provided.
     * @param orgName Name of the organization
     * @param orgName Name of the space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of streams and the total number of results found in the database (independent of limit and page)
     */
    async searchStreamsOfSpace({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<PaginatedResponse<Stream>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Stream[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/streams/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<Stream>;
    }

    /**
     * Updates the name of a space.
     * @param orgName Name of the organization
     * @param spaceName Current name of the space
     * @param newSpaceName New name for the space
     * @returns The updated space
     */
    async renameSpace(orgName: string, spaceName: string, newSpaceName: string): Promise<Space> {
        const resp = await this.axios.patch<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`), {
            newSpaceName,
        });

        return resp.data;
    }

    /**
     * Specifies to the front-end whether to display the versions under development of Wave Engines and Node Catalogs.
     * @param orgName Name of the organization
     * @param spaceName Current name of the space
     * @param enableDev Specifies to the front-end whether to display the versions under development of Wave Engines and Node Catalogs
     * @returns The updated space
     */
    async enableDev(orgName: string, spaceName: string, enableDev: boolean): Promise<Space> {
        const resp = await this.axios.patch<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`), {
            newSpaceName: spaceName,
            enableDev,
        });

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
