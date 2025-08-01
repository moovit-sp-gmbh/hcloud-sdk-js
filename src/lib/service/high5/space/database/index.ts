import Base from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { Database } from "../../../../interfaces/high5";
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
    async searchDatabases({
        orgName,
        spaceName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string }): Promise<PaginatedResponse<Database>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Database[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<Database>;
    }

    /**
     * Retrieves a Database by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @returns The requested Database
     */
    async getDatabase(orgName: string, spaceName: string, dbName: string): Promise<Database> {
        const resp = await this.axios.get<Database>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}`));

        return resp.data;
    }

    /**
     * Creates a new Database in the provided Space.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param name Name of the new Database
     * @returns The created Database
     */
    async createDatabase(orgName: string, spaceName: string, name: string): Promise<Database> {
        const resp = await this.axios.post<Database>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases`), { name });

        return resp.data;
    }

    /**
     * Rename a Database
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param name New name of the Database
     * @returns Updated Database
     */
    async renameDatabase(orgName: string, spaceName: string, dbName: string, name: string): Promise<Database> {
        const resp = await this.axios.patch<Database>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/name`), {
            name: name,
        });

        return resp.data;
    }

    /**
     * Deletes a Database by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     */
    async deleteDatabase(orgName: string, spaceName: string, dbName: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
