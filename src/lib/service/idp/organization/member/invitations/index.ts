import Base from "../../../../../Base";
import { OrganizationRole } from "../../../../../interfaces/idp";
import { OrganizationMemberInvitation } from "../../../../../interfaces/idp/organization/member/invitations";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, Sorting } from "../../../../../interfaces/global";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";

export default class IdpOrganizationMemberInvitations extends Base {
    /**
     * Retrieves all invitations sent out by the organization that match the provided search filter(s). Returns all invitations if no search filter is provided.
     * @param orgName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of invitations and the total number of results found in the database (independent of limit and page)
     */
    public search = async (params: {
        orgName: string;
        filters: SearchFilter[];
        sorting?: Sorting;
        limit?: number;
        page?: number;
    }): Promise<PaginatedResponse<OrganizationMemberInvitation>> => {
        const limit = params.limit || 25;
        const page = params.page || 0;

        // convert SearchFilters to DTO
        const filtersDTO = params.filters.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<OrganizationMemberInvitation[]>(
            this.getEndpoint(`/${params.orgName}/members/invitations/search?limit=${limit}&page=${page}`),
            {
                filters: filtersDTO,
                sorting: params.sorting,
            }
        );

        return createPaginatedResponse(resp) as PaginatedResponse<OrganizationMemberInvitation>;
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
     * @param targetUrl Optional url the link in the mail will point to
     * @returns The created invitation
     */
    public create = async (
        orgName: string,
        email: string,
        role: OrganizationRole,
        allowNonRegisteredUsers = false,
        targetUrl?: string
    ): Promise<OrganizationMemberInvitation> => {
        const resp = await this.axios.post<OrganizationMemberInvitation>(this.getEndpoint(`/${orgName}/members/invitations`), {
            email,
            role,
            allowNonRegisteredUsers,
            targetUrl,
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
        const resp = await this.axios.patch<OrganizationMemberInvitation>(
            this.getEndpoint(`/${orgName}/members/invitations/${invitationId}/approval`),
            {
                accept,
            }
        );

        return resp.data;
    };

    /**
     * Resends an invitation email.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     */
    public resendInvitationEmail = async (orgName: string, invitationId: string): Promise<void> => {
        await this.axios.post<void>(this.getEndpoint(`/${orgName}/members/invitations/${invitationId}/resend`));
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
