import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { SearchFilterDTO } from "../../../helper/searchFilter";
import {
    SearchFilter,
    SearchFilterComparatorString,
    SearchFilterMultiSelect,
    SearchFilterType,
    SortDirection,
    Sorting,
} from "../../../interfaces/Global";
import { Organization, PatchUser, User } from "../../../interfaces/IDP";
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
     * searchOrganizations requests organizations for a user using one or more search filters
     * @param orgSearchFilter an array of search filters
     * @param sort an optional sorting direction
     * @param limit an optional response limit (1-1000; defaults to 500)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns Organization array
     */
    public searchOrganizations = async (params: {
        filters: SearchFilter[];
        sorting?: Sorting;
        limit?: number;
        page?: number;
    }): Promise<[Organization[], number]> => {
        const limit = params.limit || 500;
        const page = params.page || 0;

        // convert SearchFilters to DTO
        const filtersDTO = params.filters.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios
            .post<Organization[]>(this.getEndpoint(`/v1/user/orgs/search?limit=${limit}&page=${page}`), {
                filters: filtersDTO,
                sorting: params.sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };
}
