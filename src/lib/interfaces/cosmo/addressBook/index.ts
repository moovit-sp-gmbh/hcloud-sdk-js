import { ReducedUser } from "../../idp";

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
    /** Initial members */
    members?: AddressBookMemberInput[];
    /** Initial list of internal team IDs to reference */
    teamIds?: string[];
};

export type AddressBookUpdate = {
    /** New name of the address book (1–128 chars) */
    name?: string;
    /** Updated description (max 512 chars) */
    description?: string;
};

export type AddressBookMemberInput = {
    /** Mandatory e-mail address */
    email: string;
    /** Optional display name */
    name?: string;
};

export type AddressBookTeamRequest = {
    /** List of internal team IDs to add or remove (min 1) */
    teamIds: string[];
};
