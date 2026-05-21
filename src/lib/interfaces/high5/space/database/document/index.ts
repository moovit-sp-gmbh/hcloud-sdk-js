import { ReducedSpace } from "../../../../global";
import { ReducedOrganization } from "../../../../idp/organization";
import { ReducedUser } from "../../../../idp/user";

enum DocumentType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    STRING_LIST = "STRING_LIST",
    NUMBER_LIST = "NUMBER_LIST",
    BOOLEAN_LIST = "BOOLEAN_LIST",
    OBJECT = "OBJECT",
    ARRAY = "ARRAY",
    ANY = "ANY",
}

interface Document {
    _id: string;
    key: string;
    database: string;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    type: DocumentType;
    value: any;
    ttl?: number;
    createDate: number;
    modifyDate: number;
}

interface DocumentCreateDto {
    key: string;
    type: DocumentType;
    value: any;
    ttl?: number;
}

interface DocumentPatchDto {
    value: any;
    ttl?: number;
}

export { Document, DocumentCreateDto, DocumentPatchDto, DocumentType };
