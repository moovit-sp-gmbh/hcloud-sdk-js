export interface HcloudFeature {
    feature: {
        name: string;
        enabled: boolean;
        creator: string;
        createDate: number;
        modifyDate: number;
    };
    id?: string;
    regions: string[];
    users: string[];
    organizations: string[];
}
