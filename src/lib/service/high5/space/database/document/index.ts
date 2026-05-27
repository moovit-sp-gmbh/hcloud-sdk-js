import Base, { MaybeRaw } from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { Document, DocumentCreateDto, DocumentPatchDto } from "../../../../../interfaces/high5";
import { High5DocumentCollection } from "./collection";
import { High5DocumentNumber } from "./number";

export class High5Document extends Base {
    public get number(): High5DocumentNumber {
        if (this._number === undefined) {
            this._number = new High5DocumentNumber(this.options, this.axios);
        }
        return this._number;
    }
    private _number?: High5DocumentNumber;

    public get collection(): High5DocumentCollection {
        if (this._collection === undefined) {
            this._collection = new High5DocumentCollection(this.options, this.axios);
        }
        return this._collection;
    }
    private _collection?: High5DocumentCollection;

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
    async searchDocuments<R extends boolean = false>(
        { orgName, spaceName, dbName, filters, sorting, limit = 25, page = 0 }: SearchParams & { orgName: string; spaceName: string; dbName: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Document>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<Document[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<Document>
        >;
    }

    /**
     * Retrieves a Document by its name.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @returns The requested Document
     */
    async getDocument<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.get<Document>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
    }

    /**
     * Creates a new Document in the provided Database.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param document New document details
     * @returns The created Document
     */
    async createDocument<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        document: DocumentCreateDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.post<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents`),
            document
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
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
    async updateDocument<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        document: DocumentPatchDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}`),
            document
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
    }

    /**
     * Deletes a Document by its key.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     */
    async deleteDocument<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
