export interface Version {
    path: string;
    md5: string;
    "dev-release": boolean;
    date: number;
}

export interface InstallerVersion {
    path: string;
    published_date: number; // unix timestamp
    version: string;
    os: "darwin" | "windows";
    dev: boolean;
}

export interface AgentVersions {
    latest: string;
    latestDev: string;
    versions: Record<string, Version>;
}

export interface AgentInstallerVersions {
    latest: string;
    versions: Record<string, InstallerVersion[]>;
}
