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

    async getLatestVersion(dev = false): Promise<InstallerVersion[]> {
        const resp = await this.getVersions();

        const releases = Object.values(resp.versions)
            .flat()
            .filter(r => r.dev === dev);

        releases.sort((r1, r2) => r2.published_date - r1.published_date);

        const windowsInstaller = releases.find(r => r.os === "windows");
        const macInstaller = releases.find(r => r.os === "darwin");

        const installers = [];
        if (windowsInstaller) {
            installers.push(windowsInstaller);
        }
        if (macInstaller) {
            installers.push(macInstaller);
        }

        return installers;
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
