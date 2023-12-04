import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { SearchFilter, SearchParams } from "../../../../interfaces/global";
import { OrganizationMember, OrgMemberPatch } from "../../../../interfaces/idp/organization/member";
import IdpOrganizationMemberInvitations from "./invitations";

export class IdpOrganizationMember extends Base {
    public invitations: IdpOrganizationMemberInvitations;
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.invitations = new IdpOrganizationMemberInvitations(options, axios);
    }
    /**
     * Retrieves all organization members that match the provided search filter(s). Will return all members of the organization if no search filter is provided.
     * @param orgName Name of the Organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number to skip the first (page * limit) results (defaults to 0)
     * @returns Array of Organization Members and the total number of results found in the database (independent of limit and page)
     */
    public searchOrganizationMembers = async ({
        orgName,
        filters,
        sorting,
        limit = 25,
        page = 0,
    }: SearchParams & { orgName: string }): Promise<[OrganizationMember[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });
        const resp = await this.axios.post<OrganizationMember[]>(this.getEndpoint(`/${orgName}/members/search?limit=${limit}&page=${page}`), {
            filters: filtersDTO,
            sorting: sorting,
        });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves an organization member by its user ID.
     * @param orgName Name of the organization
     * @param userId ID of the user
     * @returns The requested Organization Member
     */
    public getOrganizationMember = async (orgName: string, userId: string): Promise<OrganizationMember> => {
        const resp = await this.axios.get<OrganizationMember>(this.getEndpoint(`/${orgName}/members/${userId}`));

        return resp.data;
    };

    /**
     * Updates the role of a User in the specified Organization.
     * @param orgName Name of the Organization
     * @param userId ID of the User
     * @param orgMemberPatch New role
     * @returns The updated OrganizationMember
     */
    public patchOrganizationMemberRole = async (orgName: string, userId: string, orgMemberPatch: OrgMemberPatch): Promise<OrganizationMember> => {
        const resp = await this.axios.patch<OrganizationMember>(this.getEndpoint(`/${orgName}/members/${userId}/role`), orgMemberPatch);

        return resp.data;
    };

    /**
     * Removes a Member from an Organization.
     * @param orgName Name of the Organization
     * @param userId ID of the User
     */
    public removeOrganizationMember = async (orgName: string, userId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/${orgName}/members/${userId}`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
