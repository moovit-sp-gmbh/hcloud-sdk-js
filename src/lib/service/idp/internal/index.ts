import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { OAuthApp, Organization, Team, User } from "../../../interfaces/idp";

export class IdpInternal extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Creates an agent user for an organization.
     *
     * This is an internal endpoint and requires HCloud admin credentials to use.
     *
     * @param orgName Name of the organization
     * @returns the created user and a pat token
     */
    public createAgentUser = async (orgName: string): Promise<{ user: User; pat: string }> => {
        const res = await this.axios.post<User>(this.getEndpoint(`/v1/org/${orgName}/agent`));

        return { user: res.data, pat: res.headers.authorization };
    };

    /**
     * Update organization avatar URL.
     * This is an internal endpoint.
     *
     * @param orgName Name of the organization
     * @param avatarUrl URL of the new avatar
     * @returns the organization details
     */
    public updateOrganizationAvatar = async (orgName: string, avatarUrl: string): Promise<Organization> => {
        const res = await this.axios.patch<Organization>(this.getEndpoint(`/v1/org/${orgName}/avatar`), { url: avatarUrl });

        return res.data;
    };

    /**
     * Update team avatar URL.
     * This is an internal endpoint.
     *
     * @param orgName Name of the organization
     * @param teamName Name of the team
     * @param avatarUrl URL of the new avatar
     * @returns the team details
     */
    public updateTeamAvatar = async (orgName: string, teamName: string, avatarUrl: string): Promise<Team> => {
        const res = await this.axios.patch<Team>(this.getEndpoint(`/v1/org/${orgName}/teams/${teamName}/avatar`), { url: avatarUrl });

        return res.data;
    };

    /**
     * Update OAuth application avatar URL.
     * This is an internal endpoint.
     *
     * @param orgName Name of the organization
     * @param oAuthAppId ID of the OAuth application
     * @param avatarUrl URL of the new avatar
     * @returns the OAuth application details
     */
    public updateOAuthAppAvatar = async (orgName: string, oAuthAppId: string, avatarUrl: string): Promise<OAuthApp> => {
        const res = await this.axios.patch<OAuthApp>(this.getEndpoint(`/v1/org/${orgName}/settings/applications/oauth/${oAuthAppId}/avatar`), {
            url: avatarUrl,
        });

        return res.data;
    };

    /**
     * Update user avatar URL.
     * This is an internal endpoint.
     *
     * @param avatarUrl URL of the new avatar
     * @returns the user details
     */
    public updateUserAvatar = async (avatarUrl: string): Promise<User> => {
        const res = await this.axios.patch<User>(this.getEndpoint(`/v1/user/avatar`), { url: avatarUrl });

        return res.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/internal${endpoint}`;
    }
}
