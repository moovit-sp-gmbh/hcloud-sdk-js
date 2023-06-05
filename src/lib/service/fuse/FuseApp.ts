import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { UpdateFuseApp } from "../../interfaces/Fuse";
import { AppPermission } from "../../interfaces/Global";
import { FuseCronjob } from "./app/FuseCronjob";

export class FuseApp extends base {
    public cronjob: FuseCronjob;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.cronjob = new FuseCronjob(this.options, this.axios);
    }

    /**
     * getApps returns all app's with READ+ permission for the organization
     * @param orgName the organizations's name
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns App array
     */
    public getApps = async (orgName: string, limit?: number, page?: number): Promise<[FuseApp[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios.get<FuseApp[]>(this.getEndpoint(`/v1/org/${orgName}/apps?page=${page}&limit=${limit}`)).catch((err: Error) => {
            throw err;
        });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getAppByName returns an app by its name
     * @param orgName the organizations's name
     * @param appId the app's id
     * @returns App
     */
    public getAppByName = async (orgName: string, appName: string): Promise<FuseApp> => {
        const resp = await this.axios.get<FuseApp>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createApp returns the newly created app
     * @param orgName the organizations's name
     * @param name the name for the new app
     * @returns App
     */
    public createApp = async (orgName: string, name: string): Promise<FuseApp> => {
        const resp = await this.axios.post<FuseApp>(this.getEndpoint(`/v1/org/${orgName}/apps`), { name: name }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteAppByName delete an app by its name
     * @param orgName the organizations's name
     * @param appName the app's name
     */
    public deleteAppByName = async (orgName: string, appName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * updateAppByName return the updated app
     * @param orgName the organizations's name
     * @param appName the app's name
     * @param userId the target user
     * @param updatedFuseApp the target permission - user AppPermission.NONE to remove any permission)
     */
    public updateAppByName = async (orgName: string, appName: string, updatedFuseApp: UpdateFuseApp): Promise<FuseApp> => {
        const resp = await this.axios
            .put<FuseApp>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/permissions`), updatedFuseApp)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * patchAppPermission return the patched app
     * @param orgName the organizations's name
     * @param appName the app's name
     * @param userId the target user
     * @param permission the target permission - user AppPermission.NONE to remove any permission)
     */
    public patchAppPermission = async (orgName: string, appName: string, userId: string, permission: AppPermission): Promise<FuseApp> => {
        const resp = await this.axios
            .patch<FuseApp>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/permissions`), { userId: userId, permission: permission })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse${endpoint}`;
    }
}
