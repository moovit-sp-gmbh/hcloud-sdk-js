import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../../Base";
import {
    CreateWatchFolder,
    PatchWatchFolder,
    WatchFolder,
    WatchFolderFile,
    WatchFolderScanReport,
} from "../../../../interfaces/high5/space/watchfolder";

export class High5WatchFolder extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves a watch folder by its ID
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param watchFolderId Database ID of the watch folder
     * @returns Requested watch folder
     */
    async getWatchFolder<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        watchFolderId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, WatchFolder>> {
        const resp = await this.axios.get<WatchFolder>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/watchfolders/${watchFolderId}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WatchFolder>;
    }

    /**
     * Creates a new watch folder in the specified space
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param watchFolder Watch folder creation data
     * @returns Created watch folder
     */
    async createWatchFolder<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        watchFolder: CreateWatchFolder,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, WatchFolder>> {
        const resp = await this.axios.post<WatchFolder>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/watchfolders`), watchFolder);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WatchFolder>;
    }

    /**
     * Updates an existing watch folder
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param watchFolderId Database ID of the watch folder
     * @param patch Fields to update
     * @returns Updated watch folder
     */
    async updateWatchFolder<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        watchFolderId: string,
        patchWatchFolder: PatchWatchFolder,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, WatchFolder>> {
        const resp = await this.axios.patch<WatchFolder>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/watchfolders/${watchFolderId}`),
            patchWatchFolder
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WatchFolder>;
    }

    /**
     * Permanently deletes a watch folder
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param watchFolderId Database ID of the watch folder
     */
    async deleteWatchFolder<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        watchFolderId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/watchfolders/${watchFolderId}`));

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Submits a scan report with the list of files discovered by the agent
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param watchFolderId Database ID of the watch folder
     * @param report Scan report containing the list of discovered files
     */
    async submitScanReport<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        watchFolderId: string,
        report: WatchFolderScanReport,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post<void>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/watchfolders/${watchFolderId}/scan`),
            report
        );

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Retrieves the list of files currently tracked by a watch folder
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param watchFolderId Database ID of the watch folder
     * @returns Array of tracked file entries
     */
    async getWatchFolderFiles<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        watchFolderId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, WatchFolderFile[]>> {
        const resp = await this.axios.get<WatchFolderFile[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/watchfolders/${watchFolderId}/files`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, WatchFolderFile[]>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
