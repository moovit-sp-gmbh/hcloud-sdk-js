import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { CreateSecret, Secret, UpdateSecret } from "../../../../interfaces/high5/space/secret";

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
     * @returns Object containing an array of secret keys as well as the total number of results found in the database (independent of limit and page)
     */
    async searchSecrets<R extends boolean = false>(
        { orgName, spaceName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string; spaceName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Secret>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<Secret[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/secrets/search?limit=${limit}&page=${page}`),
            {
                filters: filtersDTO,
                sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<Secret>
        >;
    }

    /**
     * Adds a secret key-value pair to a space.
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     * @param value - Value of the key-value pair
     * @param encrypted - (optional) Boolean defining if the value should be stored encrypted (defaults to false).
     * @returns The created Secret
     */
    async addSecret<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        secret: CreateSecret,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Secret>> {
        const resp = await this.axios.post<Secret>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/secrets`), secret);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Secret>;
    }

    /**
     * Updates the value for an existent secret key-value pair.
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     * @param value - The new value of the key-value pair
     * @param encrypted - (optional) Boolean defining if the value should be stored encrypted (defaults to false).
     * @returns The updated Secret
     */
    async updateSecret<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        key: string,
        secret: UpdateSecret,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Secret>> {
        const resp = await this.axios.put<Secret>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/secrets/${key}`), secret);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Secret>;
    }

    /**
     * Deletes a key-value pair of the space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     */
    async deleteSecret<R extends boolean = false>(orgName: string, spaceName: string, key: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/secrets/${key}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Get secret value by its key
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     * @returns Secret details
     */
    async getSecret<R extends boolean = false>(orgName: string, spaceName: string, key: string, raw?: { raw: R }): Promise<MaybeRaw<R, Secret>> {
        const resp = await this.axios.get(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/secrets/${key}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Secret>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
