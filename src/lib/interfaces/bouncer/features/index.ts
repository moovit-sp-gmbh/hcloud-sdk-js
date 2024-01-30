export interface HcloudFeature {
    feature: {
        name: string;
        enabled: boolean;
    };
    id?: string;
    regions: string[];
    users: string[];
    organizations: string[];
}
