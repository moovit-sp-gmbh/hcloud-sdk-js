import Base, { MaybeRaw } from "../../../Base"
import { User } from "../../../interfaces/idp/user"

export class IdpInternal extends Base {
    /**
     * Creates an agent user for an organization.
     *
     * This is an internal endpoint and requires HCloud admin credentials to use.
     *
     * @param orgName Name of the organization
     * @returns the created user and a pat token
     */
    async createAgentUser<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, { user: User; pat: string }>> {
        const resp = await this.axios.post<User>(this.getEndpoint(`/internal/v1/org/${orgName}/agent`));

        return (
            raw?.raw
                ? { ...resp, data: { user: resp.data, pat: resp.headers["x-pat-token"] ?? "" } }
                : { user: resp.data, pat: resp.headers["x-pat-token"] ?? "" }
        ) as MaybeRaw<R, { user: User; pat: string }>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
