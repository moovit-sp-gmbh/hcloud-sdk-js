import Base, { MaybeRaw } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliServiceAccount extends Base {
    /**
     * Creates a default avatar for the specified service account.
     * @param orgName Name of the organization
     * @param serviceAccountId ID of the service account
     * @returns Public URL of the created avatar
     */
    async createAvatar<R extends boolean = false>(orgName: string, serviceAccountId: string, raw?: { raw: R }): Promise<MaybeRaw<R, AvatarCreated>> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/service-accounts/${serviceAccountId}`), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AvatarCreated>;
    }

    /**
     * Deletes the avatar of the service account from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param serviceAccountId ID of the service account
     */
    async deleteAvatar<R extends boolean = false>(orgName: string, serviceAccountId: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/service-accounts/${serviceAccountId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
