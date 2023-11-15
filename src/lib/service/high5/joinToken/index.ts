import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { JoinToken } from "../../../interfaces/high5/joinToken";
import { User } from "../../../interfaces/idp";

export class High5JoinToken extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves join tokens of the specified organization (paginated request)
     * @param orgName Name of the Organization
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array holding the join tokens
     */
    public get = async (orgName: string, limit?: number, page?: number): Promise<[JoinToken[], number]> => {
        limit = limit || 25;
        page = page || 0;

        const resp = await this.axios.get<JoinToken[]>(this.getEndpoint(`/v1/org/${orgName}/join/token?page=${page}&limit=${limit}`));

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Creates a join token for the specified organization
     * @param orgName Name of the Organization
     * @param name Name of the Join Token
     * @returns Created join token
     */
    public create = async (orgName: string, name: string): Promise<JoinToken> => {
        const resp = await this.axios.post<JoinToken>(this.getEndpoint(`/v1/org/${orgName}/join/token`), { name });

        return resp.data;
    };

    /**
     * Revokes a join token of the specified organization
     * @param orgName Name of the Organization
     * @param tokenId ID of the Join Token
     */
    public revoke = async (orgName: string, tokenId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/join/token/${tokenId}`));
    };

    /**
     * Exchanges a join token for an agent user
     *
     * @param joinToken Join token
     * @returns An object containing the User object and the PAT that represents the agent user
     */
    public exchange = async (joinToken: string): Promise<{ user: User; pat: string }> => {
        const res = await this.axios.post<User>(this.getEndpoint(`/v1/join/token`), {}, { headers: { Authorization: joinToken } });

        return { user: res.data, pat: res.headers.authorization };
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
