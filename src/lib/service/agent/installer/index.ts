import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { AgentInstallerVersions, InstallerVersion } from "../../../interfaces/agent";
import { disableCacheHeaders } from "../../../interfaces/axios";

export class AgentInstaller extends Base {
    private sourceServer: string;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.sourceServer = options.agent?.server || "https://agent.s3.helmut.cloud";
    }

    async getVersions(): Promise<AgentInstallerVersions> {
        const resp = await this.axios.get<AgentInstallerVersions>(this.getEndpoint("/install/index.json"), { headers: disableCacheHeaders });
        const registry = resp.data;

        for (const version in registry.versions) {
            setDev(registry.versions[version]);
        }

        return registry;
    }

    async getLatestVersion(): Promise<InstallerVersion[]> {
        const resp = await this.getVersions();

        return setDev(resp.versions[resp.latest]);
    }

    async getLatestVersionDarwin(): Promise<InstallerVersion | null> {
        const versions = await this.getLatestVersion();

        return versions?.find(v => v.os === "darwin") ?? null;
    }

    async getLatestVersionWindows(): Promise<InstallerVersion | null> {
        const versions = await this.getLatestVersion();

        return versions?.find(v => v.os === "windows") ?? null;
    }

    async getVersion(version: string): Promise<InstallerVersion[] | void> {
        const resp = await this.getVersions();

        return resp.versions[version];
    }

    async getVersionDarwin(version: string): Promise<InstallerVersion | null> {
        const versions = await this.getVersion(version);

        return versions?.find(v => v.os === "darwin") ?? null;
    }

    async getVersionWindows(version: string): Promise<InstallerVersion | null> {
        const versions = await this.getVersion(version);

        return versions?.find(v => v.os === "windows") ?? null;
    }

    protected getEndpoint(endpoint: string): string {
        return this.sourceServer + endpoint;
    }
}

function setDev(vs: InstallerVersion[]): InstallerVersion[] {
    for (const v of vs) {
        if (v.dev !== false) {
            // This catches undefined, etc. even though it may seem dumb
            v.dev = true;
        }
    }

    return vs;
}
