export interface Feature {
    name: string;
    enabled: boolean;
    type: "feature" | "ab";
    percentage?: number;
    users: string[];
    regions: string[];
    organizations: string[];
}
