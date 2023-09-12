import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import { SearchFilter, Sorting } from "../../../interfaces/global/SearchFilters";
import { Organization } from "../../../interfaces/idp/organization";
import { PatchUser, User } from "../../../interfaces/idp/user";
import { IdpSettings } from "./settings";

export class IdpUser extends Base {
    /**
     * Handles everything around a user's settings
     */
    public settings: IdpSettings;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.settings = new IdpSettings(options, axios);
    }

    /**
     * Retrieves the User database entry for the requesting user.
     * @returns User object
     */
    getUser = async (): Promise<User> => {
        const resp = await this.axios.get<User>(this.getEndpoint("/v1/user"));

        return resp.data;
    };

    /**
     * Updates the User database entry of the requesting user.
     * @param user PatchUser object holding the new User values
     * @returns User object
     */
    public patchUser = async (user: PatchUser): Promise<User> => {
        const resp = await this.axios.patch<User>(this.getEndpoint(`/v1/user`), user);

        return resp.data;
    };

    /**
     * Deletes user session and logs him out of HCloud on all devices.
     */
    public deleteUserSession = async (): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/sessions`));
    };

    /**
     * Deletes the requesting user.
     */
    public deleteUser = async (): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user`));
    };

    /**
     * Retrieves all Organizations of a user that match the provided search filter(s). Returns all Organizations of the user if no search filter is provided.
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of Organizations and the total number of results found in the database (independent of limit and page)
     */
    public searchOrganizations = async (params: {
        filters: SearchFilter[];
        sorting?: Sorting;
        limit?: number;
        page?: number;
    }): Promise<[Organization[], number]> => {
        const limit = params.limit || 25;
        const page = params.page || 0;

        // convert SearchFilters to DTO
        const filtersDTO = params.filters.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<Organization[]>(this.getEndpoint(`/v1/user/orgs/search?limit=${limit}&page=${page}`), {
            filters: filtersDTO,
            sorting: params.sorting,
        });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
