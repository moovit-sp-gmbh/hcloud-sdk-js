export interface Version {
    path: string;
    md5: string;
    "dev-release": boolean;
    date: number;
}

export interface AgentVersions {
    latest: string;
    versions: Record<string, Version>;
}
