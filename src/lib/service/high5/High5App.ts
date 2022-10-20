import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { App, AppPermission } from "../../interfaces/High5";

export class High5App extends base {
    /**
     * getApps returns all app's with READ+ permission for the active organization
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns App array
     */
    public getApps = async (limit?: number, page?: number): Promise<App[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios.get<App[]>(this.getEndpoint(`/v1/app?page=${page}&limit=${limit}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * getAppById returns an app by its ID
     * @param appId the app's id
     * @returns App
     */
    public getAppById = async (appId: string): Promise<App> => {
        const resp = await this.axios.get<App>(this.getEndpoint(`/v1/app/${appId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createApp returns the newly created app
     * @param name the name for the new app
     * @returns App
     */
    public createApp = async (name: string): Promise<App> => {
        const resp = await this.axios.post<App>(this.getEndpoint(`/v1/app`), { name: name }).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteAppById delete an app by its ID
     * @param appId the app's id
     */
    public deleteAppById = async (appId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/app/${appId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * patchhAppPermission return the patched app
     * @param appId the app's id
     * @param userId the target user
     * @param permission the target permission - user AppPermission.NONE to remove any persmission)
     */
    public patchAppPermission = async (appId: string, userId: string, permission: AppPermission): Promise<App> => {
        const resp = await this.axios
            .patch<App>(this.getEndpoint(`/v1/app/${appId}/permission`), { userId: userId, permission: permission })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
