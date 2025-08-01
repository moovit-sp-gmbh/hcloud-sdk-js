import Base from "../../../../../../Base";
import { Document } from "../../../../../../interfaces/high5";

export class High5DocumentNumber extends Base {
    /**
     * Increments the current integer value by one.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @returns Updated Document
     */
    async increment(orgName: string, spaceName: string, dbName: string, key: string): Promise<Document> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/inc`)
        );

        return resp.data;
    }

    /**
     * Decrements the current integer value by one.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @returns Updated Document
     */
    async decrement(orgName: string, spaceName: string, dbName: string, key: string): Promise<Document> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/dec`)
        );

        return resp.data;
    }

    /**
     * Adds value to current numeric document value.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param value Value to be added
     * @returns Updated Document
     */
    async add(orgName: string, spaceName: string, dbName: string, key: string, value: number): Promise<Document> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/inc/${value}`)
        );

        return resp.data;
    }

    /**
     * Subtracts value from current numeric document value.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @param value Value to be subtracted
     * @returns Updated Document
     */
    async subtract(orgName: string, spaceName: string, dbName: string, key: string, value: number): Promise<Document> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/dec/${value}`)
        );

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
