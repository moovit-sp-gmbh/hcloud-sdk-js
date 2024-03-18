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
}

export interface AgentVersions {
    latest: string;
    versions: Record<string, Version>;
}

export interface AgentInstallerVersions {
    latest: string;
    versions: Record<string, InstallerVersion[]>;
}
