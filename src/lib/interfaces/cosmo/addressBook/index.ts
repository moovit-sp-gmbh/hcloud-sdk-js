import { ReducedUser } from "../../idp/user";

export type AddressBook = {
    _id: string;
    name: string;
    description?: string;
    members: string[];
    createDate: number;
    modifyDate: number;
    creator: ReducedUser;
};

export type AddressBookCreate = {
    /** Name of the address book (1–128 chars) */
    name: string;
    /** Optional description (max 512 chars) */
    description?: string;
    /** Initial list of member email addresses */
    members?: string[];
};

export type AddressBookUpdate = {
    /** New name of the address book (1–128 chars) */
    name?: string;
    /** Updated description (max 512 chars) */
    description?: string;
};

export type AddressBookMemberRequest = {
    /** List of email addresses to add or remove (min 1) */
    emails: string[];
};
