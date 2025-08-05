export type Reference = {
    reference: {
        status: string;
    };
};

export enum NamespacePermission {
    READ_COMMENTS = "READ_COMMENTS",
    WRITE_COMMENTS = "WRITE_COMMENTS",
    READ_STATUS = "READ_STATUS",
}

export interface Namespace {
    _id: string;
    name: string;
}
