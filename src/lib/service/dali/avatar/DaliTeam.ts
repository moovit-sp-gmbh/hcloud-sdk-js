import Base, { MaybeRaw } from "../../../Base";
import { AvatarCreated } from "../../../interfaces/dali";
import { Team } from "../../../interfaces/idp/organization/team";

export class DaliTeam extends Base {
    /**
     * Creates a default avatar for the specified team.
     * @param orgName Name of the organization
     * @param teamName Name of the team
     * @returns Public URL of the created avatar
     */
    async createAvatar<R extends boolean = false>(orgName: string, teamName: string, raw?: { raw: R }): Promise<MaybeRaw<R, AvatarCreated>> {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}/teams/${teamName}`), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AvatarCreated>;
    }

    /**
     * Deletes the avatar of the team from cloud storage. If you want to update it instead, use updateAvatar().
     * @param orgName Name of the organization
     * @param teamName Name of the team
     */
    async deleteAvatar<R extends boolean = false>(orgName: string, teamName: string, raw?: { raw: R }): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.delete<string>(this.getEndpoint(`/v1/avatar/org/${orgName}/teams/${teamName}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    /**
     * Updates the avatar of the specified team.
     * @param orgName Name of the organization
     * @param teamName Name of the team
     * @param file Image as Javascript File
     * @returns Public URL of the new avatar
     */
    async updateAvatar<R extends boolean = false>(orgName: string, teamName: string, file: File, raw?: { raw: R }): Promise<MaybeRaw<R, Team>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<Team>(`${this.options.server}/api/account/v1/org/${orgName}/teams/${teamName}/avatar`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Team>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
