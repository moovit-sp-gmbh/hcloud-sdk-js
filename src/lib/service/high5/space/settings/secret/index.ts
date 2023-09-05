import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { Secret } from "../../../../../interfaces/high5/space/secret";

export default class High5Secret extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Requests all secret keys of the provided space which match the search filter(s) (paginated request).
     * Only the keys of the secret are sent back in the response by default, not the actual encrypted values.
     * Will return all secrets of the space if no filter is provided.
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit - (optional) Max number of results (1-100; defaults to 25)
     * @param page - (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @param encrypted - (optional) Whether to get all secret values only in encrypted form.
     * @returns Array of secret keys as well as the total number of results found in the database (independent of limit and page)
     */
    searchSecrets = async ({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<[Secret[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios
            .post<Secret[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets/search?limit=${limit}&page=${page}`), {
                filters: filtersDTO,
                sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 0)];
    };

    /**
     * Adds a secret key-value pair to a space.
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     * @param value - Value of the key-value pair
     * @param encrypted - (optional) Boolean defining if the value should be stored encrypted (defaults to false).
     * @returns The created Secret
     */
    addSecret = async (orgName: string, spaceName: string, key: string, value: string, encrypted = false): Promise<Secret> => {
        const resp = await this.axios.post<Secret>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets`), {
            key,
            value,
            encrypted,
        });

        return resp.data;
    };

    /**
     * Updates the value for an existent secret key-value pair.
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     * @param value - The new value of the key-value pair
     * @param encrypted - (optional) Boolean defining if the value should be stored encrypted (defaults to false).
     * @returns The updated Secret
     */
    updateSecret = async (orgName: string, spaceName: string, key: string, value: string, encrypted = false): Promise<Secret> => {
        const resp = await this.axios.put<Secret>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets/${key}`), {
            value,
            encrypted,
        });

        return resp.data;
    };

    /**
     * Deletes a key-value pair of the space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     */
    deleteSecret = async (orgName: string, spaceName: string, key: string): Promise<void> => {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets/${key}`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
