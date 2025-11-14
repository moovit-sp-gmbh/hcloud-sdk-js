import Base, { MaybeRaw } from "../../../../../../Base";
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
    async increment<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/inc`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
    }

    /**
     * Decrements the current integer value by one.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param dbName Name of the Database
     * @param key Key of the Document
     * @returns Updated Document
     */
    async decrement<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/dec`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
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
    async add<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        value: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/inc/${value}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
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
    async subtract<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        dbName: string,
        key: string,
        value: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Document>> {
        const resp = await this.axios.patch<Document>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/databases/${dbName}/documents/${key}/dec/${value}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Document>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
