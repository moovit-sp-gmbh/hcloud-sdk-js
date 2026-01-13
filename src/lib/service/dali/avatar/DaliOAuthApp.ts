import Base, { MaybeRaw } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";
import { OAuthApp } from "../../../interfaces/idp/organization/settings/oauthApp";

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

    /**
     * Updates the avatar of the specified OAuth app.
     * @param orgName Name of the organization
     * @param appId ID of the OAuth app
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar<R extends boolean = false>(orgName: string, appId: string, file: File, raw?: { raw: R }): Promise<MaybeRaw<R, OAuthApp>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<OAuthApp>(
            `${this.options.server}/api/account/v1/org/${orgName}/settings/applications/oauth/${appId}/avatar`,
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OAuthApp>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
