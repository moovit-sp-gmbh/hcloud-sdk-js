import Base from "../../../../../Base";
import { OrganizationRole } from "../../../../../interfaces/idp";
import { OrganizationMemberInvitation } from "../../../../../interfaces/idp/organization/member/invitations";

export default class IdpOrganizationMemberInvitations extends Base {
    /**
     * Gets all invitations sent out by the organization.
     *
     * This is a paginated request.
     *
     * @param orgName Name of the organization
     * @param page Number of the page to get
     * @param limit Number of results per page
     *
     * @returns List of invitations
     */
    public get = async (orgName: string, page?: number, limit?: number): Promise<OrganizationMemberInvitation[]> => {
        const resp = await this.axios.get<OrganizationMemberInvitation[]>(this.getEndpoint(`/${orgName}/members/invitations`), {
            params: { page, limit },
        });

        return resp.data;
    };

    /**
     * Invites a User to an Organization.
     *
     * @param orgName Name of the Organization
     * @param email Email of the person to be invited
     * @param role The role they will have within the organization if they accept the invitation
     * @param allowNonRegisteredUsers Flag to determine if the invitation should go through in the case that the email is not bound to an Helmut Cloud user.
     *                                If this is set to true and the email is unbound, then an email will be sent asking the person to register.
     *                                When they do they will automatically join the organization.
     * @returns The created invitation
     */
    public create = async (
        orgName: string,
        email: string,
        role: OrganizationRole,
        allowNonRegisteredUsers = false
    ): Promise<OrganizationMemberInvitation> => {
        const resp = await this.axios.post<OrganizationMemberInvitation>(this.getEndpoint(`/${orgName}/members/invitations`), {
            email,
            role,
            allowNonRegisteredUsers,
        });

        return resp.data;
    };

    /**
     * Accept an invitation.
     *
     * Internally this calls respond.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     * @returns The patched invitation
     */
    public accept = async (orgName: string, invitationId: string): Promise<OrganizationMemberInvitation> => this.respond(orgName, invitationId, true);

    /**
     * Reject an invitation.
     *
     * Internally this calls respond.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     * @returns The patched invitation
     */
    public reject = async (orgName: string, invitationId: string): Promise<OrganizationMemberInvitation> =>
        this.respond(orgName, invitationId, false);

    /**
     * Respond to an invitation.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     * @param accept Whether or not to accept the invitation
     * @returns The patched invitation
     */
    public respond = async (orgName: string, invitationId: string, accept: boolean): Promise<OrganizationMemberInvitation> => {
        const resp = await this.axios.patch<OrganizationMemberInvitation>(this.getEndpoint(`/${orgName}/members/invitations/${invitationId}`), {
            accept,
        });

        return resp.data;
    };

    /**
     * Cancel/Delete an invitation.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     */
    public delete = async (orgName: string, invitationId: string): Promise<void> => {
        await this.axios.delete(this.getEndpoint(`/${orgName}/members/invitations/${invitationId}`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
