import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { Organization, OrganizationSearchFilter, PatchUser, User } from "../../../interfaces/IDP";
import { IdpSettings } from "./IdpSettings";
export class IdpUser extends base {
    /**
     * settings handles everything around a user's settings
     */
    public settings: IdpSettings;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.settings = new IdpSettings(options, axios);
    }

    /**
     * getUser validates a token and returns the user object - whoami
     * @param token
     * @returns User object
     */
    getUser = async (): Promise<User> => {
        const resp = await this.axios.get<User>(this.getEndpoint("/v1/user"), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * patchUser update an entity of a user partially
     * @param user the user object
     * @returns User object
     */
    public patchUser = async (user: PatchUser): Promise<User> => {
        const resp = await this.axios.patch<User>(this.getEndpoint(`/v1/user`), user).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteUser deletes a user from the system
     * @returns User object
     */
    public deleteUser = async (): Promise<void> => {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/user`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }

    /**
     * getOrganizations requests all organizations for a user
     * @param limit an optional response limit (1-1000; defaults to 500)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns Organization array
     */
    public getOrganizations = async (limit?: number, page?: number): Promise<[Organization[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios.get<Organization[]>(this.getEndpoint(`/v1/user/orgs?limit=${limit}&page=${page}`)).catch((err: Error) => {
            throw err;
        });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * searchOrganizations requests organizations for a user by a filter
     * @param orgSearchFilter a search filter
     * @param limit an optional response limit (1-1000; defaults to 500)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns Organization array
     */
    public searchOrganizations = async (
        orgSearchFilter: OrganizationSearchFilter,
        limit?: number,
        page?: number
    ): Promise<[Organization[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .post<Organization[]>(this.getEndpoint(`/v1/user/orgs/search?limit=${limit}&page=${page}`), orgSearchFilter)
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };
}
