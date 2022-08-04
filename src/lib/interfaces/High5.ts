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
    order:number;
    organizationId: string;
    creatorId: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
}

export interface StreamPatchOrder {
    streamId: string;
    order:number;
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

export enum NodeCategory {
    CUSTOM = "CUSTOM",
}
export interface Node {
    _id: string;
    secret: string;
    category: NodeCategory;
    organizationId: string;
    archived: boolean;
    appId: string;
    eventId: string;
    streamId: string;
    userId: string;
    specification: string;
    typescript: string;
    javascript: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
    modifyDate: number;
}
