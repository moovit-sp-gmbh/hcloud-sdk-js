import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { OrganizationMember, OrgMemberPatch } from "../../../../interfaces/idp/organization/member";
import IdpOrganizationMemberInvitations from "./invitations";

export class IdpOrganizationMember extends Base {
    public get invitations(): IdpOrganizationMemberInvitations {
        if (this._invitations === undefined) {
            this._invitations = new IdpOrganizationMemberInvitations(this.options, this.axios);
        }
        return this._invitations;
    }
    private _invitations?: IdpOrganizationMemberInvitations;

    /**
     * Retrieves all organization members that match the provided search filter(s). Will return all members of the organization if no search filter is provided.
     * @param orgName Name of the Organization
     * @param filters (optional) Array of search filters
     * @param excludeTeamByName (optional) Name of a team whos members shall be excluded
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number to skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Organization Members and the total number of results found in the database (independent of limit and page)
     */
    async searchOrganizationMembers<R extends boolean = false>(
        {
            orgName,
            filters,
            excludeTeamByName,
            excludeServiceAccounts,
            sorting,
            limit = 25,
            page = 0,
        }: SearchParams & { orgName: string; excludeTeamByName?: string; excludeServiceAccounts?: boolean },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<OrganizationMember>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });
        const resp = await this.axios.post<OrganizationMember[]>(this.getEndpoint(`/${orgName}/members/search?limit=${limit}&page=${page}`), {
            filters: filtersDTO,
            sorting,
            excludeTeamByName,
            excludeServiceAccounts,
        });

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<OrganizationMember>
        >;
    }

    /**
     * Retrieves an organization member by its user ID.
     * @param orgName Name of the organization
     * @param userId ID of the user
     * @returns The requested Organization Member
     */
    async getOrganizationMember<R extends boolean = false>(
        orgName: string,
        userId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OrganizationMember>> {
        const resp = await this.axios.get<OrganizationMember>(this.getEndpoint(`/${orgName}/members/${userId}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OrganizationMember>;
    }

    /**
     * Updates the role of a User in the specified Organization.
     * @param orgName Name of the Organization
     * @param userId ID of the User
     * @param orgMemberPatch New role
     * @returns The updated OrganizationMember
     */
    async patchOrganizationMemberRole<R extends boolean = false>(
        orgName: string,
        userId: string,
        orgMemberPatch: OrgMemberPatch,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OrganizationMember>> {
        const resp = await this.axios.patch<OrganizationMember>(this.getEndpoint(`/${orgName}/members/${userId}/role`), orgMemberPatch);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OrganizationMember>;
    }

    /**
     * Updates the executionTarget flag of a User in the specified Organization.
     * @param orgName Name of the Organization
     * @param userId ID of the User
     * @param executionTarget Boolean value to set
     * @returns The updated OrganizationMember
     */
    async patchOrganizationExecutionTarget<R extends boolean = false>(
        orgName: string,
        userId: string,
        executionTarget: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OrganizationMember>> {
        const resp = await this.axios.patch<OrganizationMember>(this.getEndpoint(`/${orgName}/members/${userId}/executionTarget`), {
            executionTarget,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OrganizationMember>;
    }

    /**
     * Removes a Member from an Organization.
     * @param orgName Name of the Organization
     * @param userId ID of the User
     */
    async removeOrganizationMember<R extends boolean = false>(orgName: string, userId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/${orgName}/members/${userId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Member leaves the organization independently.
     * @param orgName Name of the Organization
     */
    async leaveOrganization<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/${orgName}/members`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
