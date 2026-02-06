export interface Short {
    _id: string;
    url: string; // The target URL including protocol://url/params?query=strings
    slug: string; // 6-characters unique identifier
    shortUrl: string; // The full shortened URL including domain and slug (e.g., https://eu.hcsl.io/dHq7b3)
    visitsLimit: number;
    visitsCurrent: number;
    organizationId: string; // The organization ID this short URL belongs to
    spaceId: string; // The space ID this short URL belongs to
    createDate: number; // timestamp
    expireDate?: number; // timestamp
    type: ShortType;
}

export enum ShortType {
    GENERIC = "GENERIC",
    COSMO = "COSMO",
}
