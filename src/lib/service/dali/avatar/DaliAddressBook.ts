import Base, { MaybeRaw } from "../../../Base";
import { AddressBook } from "../../../interfaces/cosmo/addressBook";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliAddressBook extends Base {
    /**
     * Creates a default avatar for the specified Address Book.
     * @param orgName Name of the organization
     * @param spaceName Name of the Cosmo space
     * @param bookId ID of the Address Book
     * @returns Public URL of the created avatar
     */
    async createAvatar<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AvatarCreated>> {
        const resp = await this.axios.post<AvatarCreated>(
            this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/${spaceName}/address-book/${bookId}`),
            {}
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AvatarCreated>;
    }

    /**
     * Deletes the avatar of the Address Book from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param spaceName Name of the Cosmo space
     * @param bookId ID of the Address Book
     */
    async deleteAvatar<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/spaces/${spaceName}/address-book/${bookId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    /**
     * Updates the avatar of the specified Address Book
     * @param orgName Name of the organization
     * @param spaceName Name of the Cosmo space
     * @param bookId ID of the Address Book
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        bookId: string,
        file: File,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AvatarCreated>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<AddressBook>(
            `${this.options.server}/api/cosmo/v1/org/${orgName}/spaces/${spaceName}/address-book/${bookId}/avatar`,
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return (raw?.raw ? resp : { url: resp.data.avatarUrl }) as MaybeRaw<R, AvatarCreated>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
