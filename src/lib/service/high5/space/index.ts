import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { High5Space as Space, High5SpacePermission as SpacePermission} from "../../../interfaces/high5/space";
import { PaginatedResponse, SearchFilter, SearchParams, SpacePermissionResponse } from "../../../interfaces/global";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import { createPaginatedResponse } from "../../../helper/paginatedResponseHelper";
import { High5Event } from "./event";
import { High5SpaceExecute } from "./execution";
import { High5Webhook } from "./webhook";
import High5Secret from "./secret";
import High5Wave from "./wave";
import High5Node from "./node";
import { Stream } from "../../../interfaces/high5";

export class High5Space extends Base {
    public event: High5Event;
    public execute: High5SpaceExecute;
    public webhook: High5Webhook;
    public secret: High5Secret;
    public wave: High5Wave;
    public node: High5Node;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.event = new High5Event(this.options, this.axios);
        this.execute = new High5SpaceExecute(this.options, this.axios);
        this.webhook = new High5Webhook(this.options, this.axios);
        this.secret = new High5Secret(this.options, this.axios);
        this.wave = new High5Wave(this.options, this.axios);
        this.node = new High5Node(this.options, this.axios);
    }

    /**
     * Retrieves all High5 Spaces of the specified Organization matching the search filter(s). Will return all Spaces if no search filter is provided.
     * @param orgName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of High5 Spaces and the total number of results found in the database (independent of limit and page)
     */
    public searchSpaces = async ({
        orgName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string }): Promise<PaginatedResponse<Space>> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Space[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/search?page=${page}&limit=${limit}`), {
            filters: filtersDTO,
            sorting: sorting,
        });

        return createPaginatedResponse(resp) as PaginatedResponse<Space>;
    };

    /**
     * Retrieves Permissions of a space inside an Organization matching the search filter(s). Will return all Permissions if no search filter is provided
     * and user has enough rights to see them, an empty array otherwise.
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
    }: SearchParams & { orgName: string; spaceName: string }): Promise<PaginatedResponse<SpacePermissionResponse>> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<SpacePermissionResponse[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<SpacePermissionResponse>;
    };

    /**
     * Retrieves a High5 Space by its name.
     * @param orgName Name of the Organization
     * @param spaceId ID of the High5 Space
     * @returns The requested Space
     */
    public getSpace = async (orgName: string, spaceName: string): Promise<Space> => {
        const resp = await this.axios.get<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));

        return resp.data;
    };

    /**
     * Creates a new High5 Space in the specified Organization.
     * @param orgName Name of the Organization
     * @param name Name for the new Space
     * @returns The created Space
     */
    public createSpace = async (orgName: string, name: string): Promise<Space> => {
        const resp = await this.axios.post<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces`), { name: name });

        return resp.data;
    };

    /**
     * Delete a space by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     */
    public deleteSpace = async (orgName: string, spaceName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`));
    };

    /**
     * Updates the permission a User has in the specified High5 Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param userId ID of the User
     * @param permission New permission
     * @returns The Space with updated permissions
     */
    public patchUserSpacePermission = async (
        orgName: string,
        spaceName: string,
        userId: string,
        permission: SpacePermission
    ): Promise<SpacePermissionResponse> => {
        const resp = await this.axios.patch<SpacePermissionResponse>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permission/user`), {
            userId,
            permission,
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
    ): Promise<SpacePermissionResponse> => {
        const resp = await this.axios.patch<SpacePermissionResponse>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permission/team`), {
            teamName,
            permission,
        });

        return resp.data;
    };

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
    public searchStreamsOfSpace = async ({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<PaginatedResponse<Stream>> => {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Stream[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/streams/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<Stream>;
    };

    /**
     * Updates the name of a space.
     * @param orgName Name of the organization
     * @param newSpaceName Current name of the space
     * @param newName New name for the space
     * @returns The updated space
     */
    public renameSpace = async (orgName: string, spaceName: string, newSpaceName: string): Promise<High5Space> => {
        const resp = await this.axios.patch<High5Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/name`), {
            newSpaceName,
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
