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
    all = "all",
}
