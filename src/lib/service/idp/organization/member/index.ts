import Base from "../../../../Base";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { SearchFilter, SearchParams } from "../../../../interfaces/global";
import { AddOrganizationMember, OrganizationMember, PatchOrgMember } from "../../../../interfaces/idp/organization/member";

export class IdpOrganizationMember extends Base {
    /**
     * Retrieves organization members that match the provided search filters. Will return all members of the organization if no search filter is provided.
     * @param orgName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting direction
     * @param limit (optional) Maximal number of results (1-100; defaults to 25)
     * @param page (optional) Page number to skip the first (page * limit) results (defaults to 0)
     * @returns Array with two fields: organization members (as an array) and the total number of results
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
        const resp = await this.axios
            .post<OrganizationMember[]>(this.getEndpoint(`/${orgName}/members/search?limit=${limit}&page=${page}`), {
                filters: filtersDTO,
                sorting: sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * Retrieves an organization member by its user ID
     * @param orgName Name of the organization
     * @param userId ID of the user
     * @returns Object of type OrganizationMember
     */
    public getOrganizationMember = async (orgName: string, userId: string): Promise<OrganizationMember> => {
        const resp = await this.axios.get<OrganizationMember>(this.getEndpoint(`/${orgName}/members/${userId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Add a member to an organization
     * @param orgName Name of the organization
     * @param addOrganizationMember Object containing the email and permission of the user to be invited
     * @returns The created OrganizationMember object
     */
    public addOrganizationMember = async (orgName: string, addOrganizationMember: AddOrganizationMember): Promise<OrganizationMember> => {
        const resp = await this.axios
            .post<OrganizationMember>(this.getEndpoint(`/${orgName}/members/invitations`), addOrganizationMember)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * Patches a members permission in an organization
     * @param orgName the organization name
     * @param userId the users id
     * @param patchOrgMember the new permissions
     * @returns The updated OrganizationMember object
     */
    public patchOrganizationMemberPermission = async (
        orgName: string,
        userId: string,
        patchOrgMember: PatchOrgMember
    ): Promise<OrganizationMember> => {
        const resp = await this.axios
            .patch<OrganizationMember>(this.getEndpoint(`/${orgName}/members/${userId}/permissions`), patchOrgMember)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * removeOrganizationMember removes a member from an organization
     * @param orgName the organization name
     * @param userId the id of the user
     * @returns 204 no content
     */
    public removeOrganizationMember = async (orgName: string, userId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/${orgName}/members/${userId}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
