import Base from "../../../Base";
import { User } from "../../../interfaces/idp/user";

export class IdpInternal extends Base {
    /**
     * Creates an agent user for an organization.
     *
     * This is an internal endpoint and requires HCloud admin credentials to use.
     *
     * @param orgName Name of the organization
     * @returns the created user and a pat token
     */
    async createAgentUser(orgName: string): Promise<{ user: User; pat: string }> {
        const res = await this.axios.post<User>(this.getEndpoint(`/internal/v1/org/${orgName}/agent`));

        return { user: res.data, pat: res.headers.authorization };
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
