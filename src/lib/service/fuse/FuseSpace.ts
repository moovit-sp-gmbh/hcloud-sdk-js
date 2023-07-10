import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { SearchFilterDTO } from "../../helper/searchFilter";
import { UpdateFuseSpace } from "../../interfaces/Fuse";
import { SearchFilter, SearchParams, SpacePermission } from "../../interfaces/Global";
import { FuseCronjob } from "./space/FuseCronjob";

export class FuseSpace extends base {
    public cronjob: FuseCronjob;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjob = new FuseCronjob(this.options, this.axios);
    }

    /**
     * getSpaceByName returns a space by its name
     * @param orgName the organizations's name
     * @param spaceName the space's name
     * @returns Space
     */
    public getSpaceByName = async (orgName: string, spaceName: string): Promise<FuseSpace> => {
        const resp = await this.axios.get<FuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}`)).catch((err: Error) => {
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
    public createSpace = async (orgName: string, name: string): Promise<FuseSpace> => {
        const resp = await this.axios.post<FuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces`), { name: name }).catch((err: Error) => {
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
     * updateSpaceByName return the updated space
     * @param orgName the organizations's name
     * @param spaceName the space's name
     * @param userId the target user
     * @param updatedFuseSpace the target permission - user SpacePermission.NONE to remove any permission)
     */
    public updateSpaceByName = async (orgName: string, spaceName: string, updatedFuseSpace: UpdateFuseSpace): Promise<FuseSpace> => {
        const resp = await this.axios
            .put<FuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions`), updatedFuseSpace)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * patchSpacePermission return the patched space
     * @param orgName the organizations's name
     * @param spaceName the space's name
     * @param entityId the target user
     * @param permission the target permission - user SpacePermission.NONE to remove any permission)
     */
    public patchSpacePermission = async (orgName: string, spaceName: string, entityId: string, permission: SpacePermission): Promise<FuseSpace> => {
        const resp = await this.axios
            .patch<FuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions`), { entityId: entityId, permission: permission })
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
    ): Promise<FuseSpace> => {
        const resp = await this.axios
            .patch<FuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/team/permissions`), {
                entityId: entityId,
                permission: permission,
            })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * searchSpaces search for spaces of an Organization
     * @param {SearchParams & { orgName: string }} params Search parameters
     * @param {string} params.orgName Name of the organization
     * @param {SearchFilter[]} [params.filters] an array of search filters
     * @param {Sorting} [params.sorting] an optional sorting direction
     * @param {number} [params.limit=25] an optional response limit limit (1-100; defaults to 25)
     * @param {number} [params.page=0] - an optional page to skip certain results (page * limit; defaults to 0)
     * @returns list of filtered spaces
     */
    public searchSpaces = async ({
        orgName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string }): Promise<[FuseSpace[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios
            .post<FuseSpace[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/search?limit=${limit}&page=${page}`), {
                filters: filtersDTO,
                sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
