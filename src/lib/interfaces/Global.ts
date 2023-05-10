import { ReducedOrganization, ReducedUser } from "./IDP";

export * from "./global/searchFilters";

export interface Version {
    version: string;
}

export interface ErrorMessage {
    code: string;
    error: string;
    message: string;
}

export enum Products {
    idp = "idp",
    auditor = "auditor",
    mailer = "mailer",
    high5 = "high5",
    fuse = "fuse",
    client = "client",
    all = "all",
}

export enum Views {
    save_last_view = "save_last_view",
    account = "/account",
    high5 = "/high5",
    auditor = "/auditor",
    mailer = "/mailer",
    fuse = "/fuse",
}

export enum AppPermission {
    NONE = "NONE",
    READ = "READ",
    EXECUTE = "EXECUTE",
    WRITE = "WRITE",
    MANAGE = "MANAGE",
    OWNER = "OWNER",
}
export interface AppUserPermission {
    userId: string;
    permission: AppPermission;
}

export interface App {
    _id: string;
    name: string;
    organization: ReducedOrganization;
    creator: ReducedUser;
    permissions: AppUserPermission[];
    waveEngine: string;
    createDate: number;
    modifyDate: number;
}

export enum HttpMethodEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export interface Header {
    key: string;
    value: string;
}
