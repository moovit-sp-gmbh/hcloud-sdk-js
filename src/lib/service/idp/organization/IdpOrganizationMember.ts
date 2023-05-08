import { AxiosInstance } from "axios";
import base from "../../../base";
import { AddOrganizationMember, OrganizationMember, OrganizationPermission, PatchOrgMember } from "../../../interfaces/IDP";

export class IdpOrganizationMember extends base {
    /**
     * listOrganizationMembersById requests all organization members
     * @param orgName the organization name
     * @param limit an optional response limit (1-1000; defaults to 500)
     * @param page an optional page to skip certain results (page * limit; defaults to 0)
     * @returns An array of OrganizationMembers assigned to the organization
     */
    public listOrganizationMembers = async (orgName: string, limit?: number, page?: number): Promise<[OrganizationMember[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios
            .get<OrganizationMember[]>(this.getEndpoint(`/${orgName}/members?limit=${limit}&page=${page}`))
            .catch((err: Error) => {
                throw err;
            });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * getOrganizationMembersByUserId requests a single organization member by his IDP user ID
     * @param orgName the organization name
     * @param userId the user's ID (from IDP)
     * @returns the OrganizationMember
     */
    public getOrganizationMemberByUserId = async (orgName: string, userId: string): Promise<OrganizationMember> => {
        const resp = await this.axios.get<OrganizationMember>(this.getEndpoint(`/${orgName}/members/${userId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * addOrganizationMember adds a member to an organization
     * @param orgName the organization name
     * @param addOrganizationMember the add member object
     * @returns The created OrganizationMember
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
     * patchOrganizationMemberPermission patches a members permission in an organization
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
        const resp = await this.axios.delete<void>(this.getEndpoint(`/${orgName}/members/${userId}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
