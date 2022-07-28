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
    organizationId: string;
    creatorId: string;
    permissions: AppUserPermission[];
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

export interface Event {
    _id: string;
    name: string;
    appId: string;
    organizationId: string;
    creatorId: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

export interface Stream {
    _id: string;
    name: string;
    eventId: string;
    appId: string;
    organizationId: string;
    creatorId: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

export interface Design {
    _id: string;
    name: string;
    design: any;
    build?: any;
    streamId: string;
    eventId: string;
    appId: string;
    organizationId: string;
    creatorId: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}
