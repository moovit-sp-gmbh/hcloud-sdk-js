import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { High5Space as Space } from "../../interfaces/High5";
import { SearchFilter, SearchParams, Sorting, SpacePermission } from "../../interfaces/Global";
import { High5Event } from "./space/High5Event";
import { High5Execute } from "./space/High5Execute";
import { High5Webhook } from "./space/High5Webhook";
import { SearchFilterDTO } from "../../helper/searchFilter";
import High5Secret from "./space/High5Secret";

export class High5Space extends base {
    public event: High5Event;
    public execute: High5Execute;
    public webhook: High5Webhook;
    public secrets: High5Secret;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.event = new High5Event(this.options, this.axios);
        this.execute = new High5Execute(this.options, this.axios);
        this.webhook = new High5Webhook(this.options, this.axios);
        this.secrets = new High5Secret(this.options, this.axios);
    }

    /**
     * searchSpaces returns all spaces matching the search filter and which have READ+ permission for the active organization
     * @param {SearchParams & { orgName: string }} params Search parameters
     * @param {string} params.orgName Name of the organization
     * @param {SearchFilter[]} [params.filters] an array of search filters
     * @param {Sorting} [params.sorting] an optional sorting direction
     * @param {number} [params.limit=25] an optional response limit limit (1-100; defaults to 25)
     * @param {number} [params.page=0] - an optional page to skip certain results (page * limit; defaults to 0)
     * @returns Space array and total number of matched spaces
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
     * getSpaceByName returns a space by its name
     * @param orgName the organizations's name
     * @param spaceId the space's id
     * @returns Space
     */
    public getSpaceByName = async (orgName: string, spaceName: string): Promise<Space> => {
        const resp = await this.axios.get<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createSpace returns the newly created space
     * @param orgName the organizations's name
     * @param name the name for the new space
     * @returns Space
     */
    public createSpace = async (orgName: string, name: string): Promise<Space> => {
        const resp = await this.axios.post<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces`), { name: name }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteSpaceByName delete a space by its name
     * @param orgName the organizations's name
     * @param spaceName the space's name
     */
    public deleteSpaceByName = async (orgName: string, spaceName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * patchSpacePermission return the patched space
     * @param orgName the organizations's name
     * @param spaceName the space's name
     * @param userId the target user
     * @param permission the target permission - user SpacePermission.NONE to remove any permission)
     */
    public patchSpacePermission = async (orgName: string, spaceName: string, userId: string, permission: SpacePermission): Promise<Space> => {
        const resp = await this.axios
            .patch<Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions`), { userId: userId, permission: permission })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * patchTeamSpacePermission patch the permissions of a Team
     * A team cannot be an owner of a Space.
     * @param orgName the organizations's name
     * @param spaceName the space's name
     * @param entityId the target team
     * @param permission the target permission - user SpacePermission.NONE to remove any permission)
     * @returns the patched space
     */
    public patchTeamSpacePermission = async (
        orgName: string,
        spaceName: string,
        entityId: string,
        permission: SpacePermission
    ): Promise<High5Space> => {
        const resp = await this.axios
            .patch<High5Space>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/team/permissions`), {
                entityId: entityId,
                permission: permission,
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
