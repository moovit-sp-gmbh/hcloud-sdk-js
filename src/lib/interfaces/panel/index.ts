export interface PanelVersions {
    latestDev: string;
    latest: string;
    versions: Record<string, PanelVersion[]>;
}

export interface PanelVersion {
    path: string;
    published_date: number;
    version: string;
    arch: string;
    os: string;
    dev: boolean;
}
