import Base from "../../../../../../Base";
import { JobLogCreate, JobLogDto } from "../../../../../../interfaces/high5/space/job/JobLog";

export class High5JobLogInternal extends Base {
    /**
     * Creates a log for a cronjob.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgName Name of the organization
     * @param spaceName Name of the High5 space
     * @param createJobLog Cronjob log to be created
     * @returns the created cronjob log with metadata
     */
    async createJobLog(orgName: string, spaceName: string, jobId: string, log: JobLogCreate): Promise<JobLogDto> {
        const resp = await this.axios.post<JobLogDto>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/jobs/${jobId}/logs}`), log);

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
