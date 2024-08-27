import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { createPaginatedResponse } from "../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import {
    FuseSpace as IFuseSpace,
    FuseSpaceEntityPermission as SpaceEntityPermission,
    FuseSpacePermission as SpacePermission,
} from "../../../interfaces/fuse/space";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../interfaces/global";
import { FuseCronjob } from "./cronjob";

export class FuseSpace extends Base {
    public cronjob: FuseCronjob;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjob = new FuseCronjob(this.options, this.axios);
    }

    /**
     * Retrieves a Fuse space by its name
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @returns The requested space
     */
    public getSpace = async (orgName: string, spaceName: string): Promise<IFuseSpace> => {
        const resp = await this.axios.get<IFuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));

        return resp.data;
    };

    /**
     * Creates a new Fuse space
     * @param orgName Name of the organization
     * @param name Name of the space to be created
     * @returns The created space
     */
    public createSpace = async (orgName: string, name: string): Promise<IFuseSpace> => {
        const resp = await this.axios.post<IFuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces`), { name: name });

        return resp.data;
    };

    /**
     * Deletes a space by its name
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     */
    public deleteSpace = async (orgName: string, spaceName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));
    };

    /**
     * Adds/Updates/Removes the permission a user has in the specified space.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param userId ID of the user
     * @param permission New permission
     * @returns The Fuse space with the updated permissions
     */
    public updateUserSpacePermission = async (
        orgName: string,
        spaceName: string,
        userId: string,
        permission: SpacePermission
    ): Promise<SpaceEntityPermission> => {
        const resp = await this.axios.put<SpaceEntityPermission>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions/user`), {
            userId,
            permission,
        });

        return resp.data;
    };

    /**
     * Adds/Updates/Removes the permission a team has in the specified space. Note: A team cannot be an owner of a Space.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param teamName Name of the team
     * @param permission New permission
     * @returns The Fuse space with the updated permissions
     */
    public updateTeamSpacePermission = async (
        orgName: string,
        spaceName: string,
        teamName: string,
        permission: SpacePermission
    ): Promise<SpaceEntityPermission> => {
        const resp = await this.axios.put<SpaceEntityPermission>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions/team`), {
            teamName,
            permission,
        });

        return resp.data;
    };

    /**
     * Retrieves all Fuse spaces of an organization which match the provided search filter(s). Will return all spaces of the organization if no filter is provided.
     * @param orgName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of filtered Fuse spaces as well as the total number of results found in the database (independent of limit and page)
     */
    public searchSpaces = async ({
        orgName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string }): Promise<PaginatedResponse<IFuseSpace>> => {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<IFuseSpace[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/search?limit=${limit}&page=${page}`), {
            filters: filtersDTO,
            sorting,
        });

        return createPaginatedResponse(resp) as PaginatedResponse<IFuseSpace>;
    };

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
    public searchSpacePermissions = async ({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<PaginatedResponse<SpaceEntityPermission>> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<SpaceEntityPermission[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<SpaceEntityPermission>;
    };

    /**
     * Updates the name of a space.
     * @param orgName Name of the organization
     * @param spaceName Current name of the space
     * @param newSpaceName New name for the space
     * @returns The updated space
     */
    public renameSpace = async (orgName: string, spaceName: string, newSpaceName: string): Promise<IFuseSpace> => {
        const resp = await this.axios.patch<IFuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/name`), {
            newSpaceName,
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
