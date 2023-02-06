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

export enum Views {
    save_last_view = "save_last_view",
    account = "/account",
    high5 = "/high5",
    auditor = "/auditor",
    mailer = "/mailer",
    fuse = "/fuse",
}
