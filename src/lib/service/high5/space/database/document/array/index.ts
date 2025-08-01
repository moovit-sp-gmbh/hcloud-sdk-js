import Base from "../../../../../../Base";
import { createPaginatedResponse } from "../../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../../interfaces/global";
import { Document } from "../../../../../../interfaces/high5";

export class High5DocumentArray extends Base {
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
    async searchItems({
        orgName,
        spaceName,
        dbName,
        key,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string; spaceName: string; dbName: string; key: string }): Promise<PaginatedResponse<object>> {
        const filtersDTO = filters?.map((f: SearchFilter) => new SearchFilterDTO(f));

        const resp = await this.axios.post<object[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/search?page=${page}&limit=${limit}`),
            {
                filters: filtersDTO,
                sorting: sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<object>;
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
    async getItem(orgName: string, spaceName: string, dbName: string, key: string, index: number): Promise<object> {
        const resp = await this.axios.get<object>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/index/${index}`)
        );

        return resp.data;
    }

    /**
     * Deletes an item of the specified array by its index.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param index Index of the item of the array
     */
    async deleteItem(orgName: string, spaceName: string, dbName: string, key: string, index: number): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/index/${index}`));
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
    async pushItems(orgName: string, spaceName: string, dbName: string, key: string, items: Array<unknown>): Promise<Document> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/push`),
            { value: items }
        );

        return resp.data;
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
    async unshiftItems(orgName: string, spaceName: string, dbName: string, key: string, items: Array<unknown>): Promise<Document> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/unshift`),
            { value: items }
        );

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
