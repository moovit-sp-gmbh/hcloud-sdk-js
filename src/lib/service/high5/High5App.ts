import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { App, AppPermission } from "../../interfaces/High5";
import { High5Event } from "./app/High5Event";
import { High5Execute } from "./app/High5Execute";
import { High5Webhook } from "./app/High5Webhook";

export class High5App extends base {
    public event: High5Event;
    public execute: High5Execute;
    public webhook: High5Webhook;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.event = new High5Event(this.options, this.axios);
        this.execute = new High5Execute(this.options, this.axios);
        this.webhook = new High5Webhook(this.options, this.axios);
    }

    /**
     * getApps returns all app's with READ+ permission for the active organization
     * @param orgName the organizations's name
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @returns App array
     */
    public getApps = async (orgName: string, limit?: number, page?: number): Promise<[App[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios.get<App[]>(this.getEndpoint(`/v1/org/${orgName}/apps?page=${page}&limit=${limit}`)).catch((err: Error) => {
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
    public getAppByName = async (orgName: string, appName: string): Promise<App> => {
        const resp = await this.axios.get<App>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}`)).catch((err: Error) => {
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
    public createApp = async (orgName: string, name: string): Promise<App> => {
        const resp = await this.axios.post<App>(this.getEndpoint(`/v1/org/${orgName}/apps`), { name: name }).catch((err: Error) => {
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
     * patchAppPermission return the patched app
     * @param orgName the organizations's name
     * @param appName the app's name
     * @param userId the target user
     * @param permission the target permission - user AppPermission.NONE to remove any permission)
     */
    public patchAppPermission = async (orgName: string, appName: string, userId: string, permission: AppPermission): Promise<App> => {
        const resp = await this.axios
            .patch<App>(this.getEndpoint(`/v1/org/${orgName}/apps/${appName}/permissions`), { userId: userId, permission: permission })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
