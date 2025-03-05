import Base from "../../../Base";
import { createPaginatedResponse } from "../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import {
    FridaySpace as Space,
    FridaySpaceEntityPermission as SpaceEntityPermission,
    FridaySpacePermission as SpacePermission,
} from "../../../interfaces/friday/space";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../interfaces/global";
import { FridayDatabase } from "./database";

export class FridaySpace extends Base {
    public get database(): FridayDatabase {
        if (this._database === undefined) {
            this._database = new FridayDatabase(this.options, this.axios);
        }
        return this._database;
    }
    private _database?: FridayDatabase;

    /**
     * Retrieves all Friday Spaces of the specified Organization matching the search filter(s). Will return all Spaces if no search filter is provided.
     * @param orgName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Friday Spaces and the total number of results found in the database (independent of limit and page)
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
     * Retrieves a Friday Space by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Friday Space
     * @returns The requested Space
     */
    async getSpace(orgName: string, spaceName: string): Promise<Space> {
        const resp = await this.axios.get<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));

        return resp.data;
    }

    /**
     * Creates a new Friday Space in the specified Organization.
     * @param orgName Name of the Organization
     * @param name Name for the new Space
     * @returns The created Space
     */
    async createSpace(orgName: string, name: string): Promise<Space> {
        const resp = await this.axios.post<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces`), { name });

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
     * Updates the name of a space.
     * @param orgName Name of the organization
     * @param spaceName Current name of the space
     * @param newSpaceName New name for the space
     * @returns The updated space
     */
    async renameSpace(orgName: string, spaceName: string, newSpaceName: string): Promise<Space> {
        const resp = await this.axios.patch<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/name`), {
            newSpaceName,
        });

        return resp.data;
    }

    /**
     * Retrieves permissions of a space matching the search filter(s). Will return all permissions of the space if no search filter is provided.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Friday Space Permissions and the total number of results found in the database (independent of limit and page)
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

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/friday${endpoint}`;
    }
}
