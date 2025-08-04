export interface Short {
    _id: string;
    url: string; // The target URL including protocol://url/params?query=strings
    slug: string; // 6-characters unique identifier
    visitsLimit: number;
    visitsCurrent: number;
    organizationId: string; // The organization ID this short URL belongs to
    spaceId: string; // The space ID this short URL belongs to
    createDate: number; // timestamp
}
