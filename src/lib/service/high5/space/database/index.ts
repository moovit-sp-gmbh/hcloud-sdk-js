import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { ApiKey, ApiKeyPermission, Database } from "../../../../interfaces/high5";
import { High5Document } from "./document";

export class High5Database extends Base {
    public get document(): High5Document {
        if (this._document === undefined) {
            this._document = new High5Document(this.options, this.axios);
        }
        return this._document;
    }
    private _document?: High5Document;

    /**
     * Retrieves all Databases of a High5 Space which match the provided search filter(s). Will return all Databases of the Space if no filter is provided.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Databases and the total number of results found in the database (independent of limit and page)
     */
    async searchDatabases<R extends boolean = false>(
        { orgName, spaceName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string; spaceName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Database>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Database[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<Database>
        >;
    }

    /**
     * Retrieves a Database by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @returns The requested Database
     */
    async getDatabase<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Database>> {
        const resp = await this.axios.get<Database>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Database>;
    }

    /**
     * Creates a new Database in the provided Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param name Name of the new Database
     * @returns The created Database
     */
    async createDatabase<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        name: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Database>> {
        const resp = await this.axios.post<Database>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases`), { name });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Database>;
    }

    /**
     * Rename a Database
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param name New name of the Database
     * @returns Updated Database
     */
    async renameDatabase<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        name: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Database>> {
        const resp = await this.axios.patch<Database>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/name`), {
            name: name,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Database>;
    }

    /**
     * Deletes a Database by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     */
    async deleteDatabase<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Generates a new API key for a specific database within the space
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param name Name of the API key
     * @param permission Permission level for the API key
     * @returns The created API key details
     */
    async createDatabaseApiKey<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        name: string,
        permission: ApiKeyPermission,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, ApiKey>> {
        const resp = await this.axios.post<ApiKey>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/apikey`), {
            name,
            permission,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ApiKey>;
    }

    /**
     * Removes an existing API key by its name, revoking access to the database
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param keyName Name of the API key to delete
     */
    async deleteDatabaseApiKey<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        keyName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/apikey/${keyName}`));

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
