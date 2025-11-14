import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../../Base";
import { High5JobInternal } from "./job";

export class High5SpaceInternal extends Base {
    public get job(): High5JobInternal {
        if (this._job === undefined) {
            this._job = new High5JobInternal(this.options, this.axios);
        }
        return this._job;
    }
    private _job?: High5JobInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Deletes all spaces of an organization.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgName Name of the organization
     */
    async deleteAllSpacesOfOrganization<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Removes the user from all spaces of an organization.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param orgName Name of the organization
     * @param userId ID of the user
     */
    async removeUserFromAllSpacesOfOrganization<R extends boolean = false>(
        orgName: string,
        userId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/user/${userId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
