import { ReducedUser } from "../../idp";

/** Members as key-value pairs: mandatory e-mail address -> optional display name (used for create/add input) */
export type AddressBookMembers = Record<string, string | undefined>;

export enum AddressBookMemberType {
    /** Existing helmut.cloud user */
    INTERNAL = "INTERNAL",
    /** Email-only recipient without a helmut.cloud account */
    EXTERNAL = "EXTERNAL",
}

export type AddressBookMember = {
    /** Mandatory e-mail address */
    email: string;
    /** Optional display name */
    name?: string;
    /** Timestamp in milliseconds when the member was added */
    addedDate: number;
    /** Whether the member is an existing helmut.cloud user (INTERNAL) or an email-only recipient (EXTERNAL) */
    type: AddressBookMemberType;
};

export type AddressBook = {
    _id: string;
    name: string;
    description?: string;
    members: AddressBookMember[];
    /** IDs of internal teams referenced by the address book */
    teamIds: string[];
    createDate: number;
    modifyDate: number;
    avatarUrl: string;
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
