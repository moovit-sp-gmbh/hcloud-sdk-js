import Base, { MaybeRaw } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";

export class DaliOAuthApp extends Base {
    /**
     * Creates a default avatar for the specified OAuth app.
     * @param orgName Name of the organization
     * @param appId ID of the OAuth app
     * @returns Public URL of the created avatar
     */
    async createAvatar<R extends boolean = false>(orgName: string, appId: string, raw?: { raw: R }): Promise<MaybeRaw<R, AvatarCreated>> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/applications/oauth/${appId}`), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AvatarCreated>;
    }

    /**
     * Deletes the avatar of the OAuth app from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param appId ID of the OAuth app
     */
    async deleteAvatar<R extends boolean = false>(orgName: string, appId: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/applications/oauth/${appId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
