import { ReducedUser } from "../../idp/user";

/** Members as key-value pairs: mandatory e-mail address -> optional display name */
export type AddressBookMembers = Record<string, string | undefined>;

export type AddressBook = {
    _id: string;
    name: string;
    description?: string;
    members: AddressBookMembers;
    /** IDs of internal teams referenced by the address book */
    teamIds: string[];
    createDate: number;
    modifyDate: number;
    creator: ReducedUser;
};

export type AddressBookCreate = {
    /** Name of the address book (1–128 chars) */
    name: string;
    /** Optional description (max 512 chars) */
    description?: string;
    /** Initial members (e-mail -> optional display name) */
    members?: AddressBookMembers;
    /** Initial list of internal team IDs to reference */
    teamIds?: string[];
};

export type AddressBookUpdate = {
    /** New name of the address book (1–128 chars) */
    name?: string;
    /** Updated description (max 512 chars) */
    description?: string;
};

export type AddressBookMemberAddRequest = {
    /** Members to add (e-mail -> optional display name, min 1) */
    members: AddressBookMembers;
};

export type AddressBookMemberRemoveRequest = {
    /** List of email addresses to remove (min 1) */
    emails: string[];
};

export type AddressBookTeamRequest = {
    /** List of internal team IDs to add or remove (min 1) */
    teamIds: string[];
};
