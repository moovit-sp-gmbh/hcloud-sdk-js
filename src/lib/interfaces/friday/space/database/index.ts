export interface Database {
    _id: string;
    name: string;
    spaceId: string;
    organizationId: string;
    creatorId: string;
    // UTC+0 unix timestamp
    createDate: number;
}
