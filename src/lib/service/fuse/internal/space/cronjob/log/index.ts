import Base, { MaybeRaw } from "../../../../../../Base";
import { CronjobLogCreate, CronjobLogDto } from "../../../../../../interfaces/fuse/space/cronjob/CronjobLog";

export class FuseCronjobLogInternal extends Base {
    /**
     * Creates a log for a cronjob.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgName Name of the organization
     * @param spaceName Name of the Fuse space
     * @param createCronjob Cronjob log to be created
     * @returns the created cronjob log with metadata
     */
    async createCronjobLog<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        cronjobId: string,
        log: CronjobLogCreate,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, CronjobLogDto>> {
        const resp = await this.axios.post<CronjobLogDto>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${cronjobId}/logs}`), log);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, CronjobLogDto>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/fuse/internal${endpoint}`;
    }
}
