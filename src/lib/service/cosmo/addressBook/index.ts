import Base, { MaybeRaw } from "../../../Base";
import {
    AddressBook,
    AddressBookCreate,
    AddressBookMemberAddRequest,
    AddressBookMemberRemoveRequest,
    AddressBookMembers,
    AddressBookTeamRequest,
    AddressBookUpdate,
} from "../../../interfaces/cosmo/addressBook";
import { SearchFilter, Sorting } from "../../../interfaces/global/SearchFilters";

/**
 * @class CosmoAddressBook
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents an Address Book resource in Cosmo, providing methods to interact with the Address Book API.
 * Address books exist on space level and hold named groups of e-mail addresses (members).
 */
export class CosmoAddressBook extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    private basePath(orgName: string, spaceName: string): string {
        return `/v1/org/${orgName}/spaces/${spaceName}/address-book`;
    }

    /**
     * Search address books of a Space with optional filters, sorting and pagination.
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param filters Optional search filters
     * @param sorting Optional sorting definition
     * @param limit Maximum number of results per page (default 100)
     * @param page Zero-based page number (default 0)
     * @returns Paginated result with items and total count
     */
    async searchAddressBooks<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        { filters, sorting, limit, page }: { filters?: SearchFilter[]; sorting?: Sorting; limit?: number; page?: number } = {},
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AddressBook[]>> {
        const resp = await this.axios.post<AddressBook[]>(
            this.getEndpoint(`${this.basePath(orgName, spaceName)}/search`),
            { filters: filters ?? [], ...(sorting ? { sorting } : {}) },
            { params: { limit: limit ?? 100, page: page ?? 0 } }
        );
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AddressBook[]>;
    }

    /**
     * Create a new Address Book inside the specified Space.
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param data Address book creation payload
     * @returns The created AddressBook
     */
    async createAddressBook<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        data: AddressBookCreate,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AddressBook>> {
        const resp = await this.axios.post<AddressBook>(this.getEndpoint(this.basePath(orgName, spaceName)), data);
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AddressBook>;
    }

    /**
     * Get a single Address Book by its ID.
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param bookId ID of the Address Book
     * @returns The requested AddressBook
     */
    async getAddressBook<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AddressBook>> {
        const resp = await this.axios.get<AddressBook>(this.getEndpoint(`${this.basePath(orgName, spaceName)}/${bookId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AddressBook>;
    }

    /**
     * Update an existing Address Book (rename / change description).
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param bookId ID of the Address Book
     * @param data Fields to update
     * @returns The updated AddressBook
     */
    async updateAddressBook<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        data: AddressBookUpdate,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AddressBook>> {
        const resp = await this.axios.patch<AddressBook>(this.getEndpoint(`${this.basePath(orgName, spaceName)}/${bookId}`), data);
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AddressBook>;
    }

    /**
     * Delete an Address Book by its ID.
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param bookId ID of the Address Book to delete
     * @returns 204 No Content on success
     */
    async deleteAddressBook<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`${this.basePath(orgName, spaceName)}/${bookId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Add one or more members to an Address Book.
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param bookId ID of the Address Book
     * @param members Members to add (e-mail -> optional display name)
     * @returns The updated AddressBook
     */
    async addAddressBookMembers<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        members: AddressBookMembers,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AddressBook>> {
        const payload: AddressBookMemberAddRequest = { members };
        const resp = await this.axios.post<AddressBook>(this.getEndpoint(`${this.basePath(orgName, spaceName)}/${bookId}/members`), payload);
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AddressBook>;
    }

    /**
     * Remove one or more members (by e-mail) from an Address Book.
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param bookId ID of the Address Book
     * @param emails List of e-mail addresses to remove (min 1)
     * @returns The updated AddressBook
     */
    async removeAddressBookMembers<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        emails: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AddressBook>> {
        const payload: AddressBookMemberRemoveRequest = { emails };
        const resp = await this.axios.delete<AddressBook>(this.getEndpoint(`${this.basePath(orgName, spaceName)}/${bookId}/members`), {
            data: payload,
        });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AddressBook>;
    }

    /**
     * Add one or more internal team references to an Address Book. Team membership stays live: changes to a
     * referenced team are reflected in the address book's recipients.
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param bookId ID of the Address Book
     * @param teamIds List of internal team IDs to add (min 1)
     * @returns The updated AddressBook
     */
    async addAddressBookTeams<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        teamIds: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AddressBook>> {
        const payload: AddressBookTeamRequest = { teamIds };
        const resp = await this.axios.post<AddressBook>(this.getEndpoint(`${this.basePath(orgName, spaceName)}/${bookId}/teams`), payload);
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AddressBook>;
    }

    /**
     * Remove one or more internal team references from an Address Book.
     * @remarks
     * **Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param bookId ID of the Address Book
     * @param teamIds List of internal team IDs to remove (min 1)
     * @returns The updated AddressBook
     */
    async removeAddressBookTeams<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        teamIds: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AddressBook>> {
        const payload: AddressBookTeamRequest = { teamIds };
        const resp = await this.axios.delete<AddressBook>(this.getEndpoint(`${this.basePath(orgName, spaceName)}/${bookId}/teams`), {
            data: payload,
        });
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AddressBook>;
    }
}
