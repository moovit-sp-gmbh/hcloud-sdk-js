export interface HcloudFeature {
    name: string;
    enabled: boolean;
    regions: string[];
    organizations: string[];
    users: string[];
}
