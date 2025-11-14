import Base, { MaybeRaw } from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, Sorting } from "../../../../../interfaces/global";
import { OrganizationRole } from "../../../../../interfaces/idp";
import { OrganizationMemberInvitation } from "../../../../../interfaces/idp/organization/member/invitations";

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
    async search<R extends boolean = false>(
        params: {
            orgName: string;
            filters: SearchFilter[];
            sorting?: Sorting;
            limit?: number;
            page?: number;
        },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<OrganizationMemberInvitation>>> {
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

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<OrganizationMemberInvitation>
        >;
    }

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
    async create<R extends boolean = false>(
        orgName: string,
        email: string,
        role: OrganizationRole,
        allowNonRegisteredUsers = false,
        targetUrl?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OrganizationMemberInvitation>> {
        const resp = await this.axios.post<OrganizationMemberInvitation>(this.getEndpoint(`/${orgName}/members/invitations`), {
            email,
            role,
            allowNonRegisteredUsers,
            targetUrl,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OrganizationMemberInvitation>;
    }

    /**
     * Accept an invitation.
     *
     * Internally this calls respond.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     * @returns The patched invitation
     */
    public async accept<R extends boolean = false>(
        orgName: string,
        invitationId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OrganizationMemberInvitation>> {
        return this.respond(orgName, invitationId, true, raw);
    }

    /**
     * Reject an invitation.
     *
     * Internally this calls respond.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     * @returns The patched invitation
     */
    public async reject<R extends boolean = false>(
        orgName: string,
        invitationId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OrganizationMemberInvitation>> {
        return this.respond(orgName, invitationId, false, raw);
    }

    /**
     * Respond to an invitation.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     * @param accept Whether or not to accept the invitation
     * @returns The patched invitation
     */
    public async respond<R extends boolean = false>(
        orgName: string,
        invitationId: string,
        accept: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OrganizationMemberInvitation>> {
        const resp = await this.axios.patch<OrganizationMemberInvitation>(
            this.getEndpoint(`/${orgName}/members/invitations/${invitationId}/approval`),
            {
                accept,
            }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OrganizationMemberInvitation>;
    }

    /**
     * Resends an invitation email.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     */
    public async resendInvitationEmail<R extends boolean = false>(
        orgName: string,
        invitationId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const repo = await this.axios.post<void>(this.getEndpoint(`/${orgName}/members/invitations/${invitationId}/resend`));
        return (raw?.raw ? repo : repo.data) as MaybeRaw<R, void>;
    }

    /**
     * Cancel/Delete an invitation.
     *
     * @param orgName Name of the Organization
     * @param invitationId ID of the invitation
     */
    public async delete<R extends boolean = false>(orgName: string, invitationId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const repo = await this.axios.delete(this.getEndpoint(`/${orgName}/members/invitations/${invitationId}`));
        return (raw?.raw ? repo : repo.data) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
