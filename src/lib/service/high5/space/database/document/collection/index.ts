import Base, { MaybeRaw } from "../../../../../../Base";
import { createPaginatedResponse } from "../../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../../interfaces/global";
import { Document } from "../../../../../../interfaces/high5";

export class High5DocumentCollection extends Base {
    /**
     * Retrieves all items of a specified array document which match the provided search filter(s). Will return all items of the array if no filter is provided.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document (it should be document with Array<object>)
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of items and the total number of results found in the document (independent of limit and page)
     */
    async searchItems<R extends boolean = false>(
        {
            orgName,
            spaceName,
            dbName,
            key,
            filters,
            sorting,
            limit = 25,
            page = 0,
        }: SearchParams & { orgName: string; spaceName: string; dbName: string; key: string },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<object>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<object[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<object>
        >;
    }

    /**
     * Retrieves an array item by its index.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param index Index of the arrays item
     * @returns The requested item of the array
     */
    async getItem<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        index: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, object>> {
        const resp = await this.axios.get<object>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/index/${index}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, object>;
    }

    /**
     * Deletes an item of the specified array by its index.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param index Index of the item of the array
     */
    async deleteItem<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        index: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/index/${index}`)
        );
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Pushes a list of items to the end of the specified array document.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param items New array items to be added to the end of the specified array document
     * @returns Updated Document
     */
    async pushItems<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        items: Array<unknown>,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/push`),
            { value: items }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
    }

    /**
     * Unshifts a list of items to the beginning of the specified array document.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param items New array items to be inserted to the beginning of the specified array document
     * @returns Updated Document
     */
    async unshiftItems<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        items: Array<unknown>,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/unshift`),
            { value: items }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
    }

    /**
     * Add or update one or more key/value pairs inside an object document without replacing the entire value.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param pairs Key/value pairs to upsert into the object document
     * @returns Updated Document
     */
    async upsertObjectPairs<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        pairs: Record<string, any>,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/partial`),
            { pairs }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
    }

    /**
     * Remove one or more keys from an object document.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param keys List of keys to remove from the object document
     * @returns Updated Document
     */
    async deleteObjectKeys<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        keys: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/keys`),
            { keys }
        );

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, Document>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
