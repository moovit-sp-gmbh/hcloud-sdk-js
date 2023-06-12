import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { UpdateFuseSpace } from "../../interfaces/Fuse";
import { SpacePermission } from "../../interfaces/Global";
import { FuseCronjob } from "./space/FuseCronjob";

export class FuseSpace extends base {
    public cronjob: FuseCronjob;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjob = new FuseCronjob(this.options, this.axios);
    }

    /**
     * getSpaces returns all space's with READ+ permission for the organization
     * @param orgName the organizations's name
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns Space array
     */
    public getSpaces = async (orgName: string, limit?: number, page?: number): Promise<[FuseSpace[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios
            .get<FuseSpace[]>(this.getEndpoint(`/v1/org/${orgName}/spaces?page=${page}&limit=${limit}`))
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
     * @param userId the target user
     * @param permission the target permission - user SpacePermission.NONE to remove any permission)
     */
    public patchSpacePermission = async (orgName: string, spaceName: string, userId: string, permission: SpacePermission): Promise<FuseSpace> => {
        const resp = await this.axios
            .patch<FuseSpace>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/permissions`), { userId: userId, permission: permission })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
