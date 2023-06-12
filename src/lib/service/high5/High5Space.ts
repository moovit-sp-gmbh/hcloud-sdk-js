import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { High5Space as Space } from "../../interfaces/High5";
import { SpacePermission } from "../../interfaces/Global";
import { High5Event } from "./space/High5Event";
import { High5Execute } from "./space/High5Execute";
import { High5Webhook } from "./space/High5Webhook";

export class High5Space extends base {
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
     * getSpaces returns all space's with READ+ permission for the active organization
     * @param orgName the organizations's name
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @returns Space array
     */
    public getSpaces = async (orgName: string, limit?: number, page?: number): Promise<[Space[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios.get<Space[]>(this.getEndpoint(`/v1/org/${orgName}/spaces?page=${page}&limit=${limit}`)).catch((err: Error) => {
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

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
