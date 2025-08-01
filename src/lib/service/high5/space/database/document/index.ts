import Base from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { Document, DocumentCreateDto, DocumentPatchDto } from "../../../../../interfaces/high5";
import { High5DocumentArray } from "./array";
import { High5DocumentNumber } from "./number";

export class High5Document extends Base {
    public get number(): High5DocumentNumber {
        if (this._number === undefined) {
            this._number = new High5DocumentNumber(this.options, this.axios);
        }
        return this._number;
    }
    private _number?: High5DocumentNumber;

    public get array(): High5DocumentArray {
        if (this._array === undefined) {
            this._array = new High5DocumentArray(this.options, this.axios);
        }
        return this._array;
    }
    private _array?: High5DocumentArray;

    /**
     * Retrieves all Documents of a High5 Database which match the provided search filter(s). Will return all Documents of the Database if no filter is provided.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Documents and the total number of results found in the database (independent of limit and page)
     */
    async searchDocuments({
        orgName,
        spaceName,
        dbName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string; dbName: string }): Promise<PaginatedResponse<Document>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Document[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<Document>;
    }

    /**
     * Retrieves a Document by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @returns The requested Document
     */
    async getDocument(orgName: string, spaceName: string, dbName: string, key: string): Promise<Document> {
        const resp = await this.axios.get<Document>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}`));

        return resp.data;
    }

    /**
     * Creates a new Document in the provided Database.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param document New document details
     * @returns The created Document
     */
    async createDocument(orgName: string, spaceName: string, dbName: string, document: DocumentCreateDto): Promise<Document> {
        const resp = await this.axios.post<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents`),
            document
        );

        return resp.data;
    }

    /**
     * Update existing Document
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param document New value to update the Document
     * @returns Updated Document
     */
    async updateDocument(orgName: string, spaceName: string, dbName: string, key: string, document: DocumentPatchDto): Promise<Document> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}`),
            document
        );

        return resp.data;
    }

    /**
     * Deletes a Document by its key.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     */
    async deleteDocument(orgName: string, spaceName: string, dbName: string, key: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
