export interface FeatureFlag {
    name: string;
    enabled: boolean;
    regions: string[];
    organizations: string[];
    users: string[];
}
