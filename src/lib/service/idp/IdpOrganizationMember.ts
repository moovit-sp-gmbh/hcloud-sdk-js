import axios from "axios";
import base from "../../base";
import { OrganizationMember, OrganizationMemberRole } from "../../interfaces/IDP";

export class IdpOrganizationMember extends base {
    /**
     * listOrganizationMembersById requests all organization members
     * @param id the organzation id
     * @param limit an opitional response limit (1-1000; dafaults to 500)
     * @param page an opitional page to skip certain results (page * limit; defaults to 0)
     * @returns OrganizationMember array
     */
    public listOrganizationMembersById = async (id: string, limit?: number, page?: number): Promise<OrganizationMember[]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await axios.get<OrganizationMember[]>(this.getEndpoint(`/${id}/member?page=${page}&limit=${limit}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * addOrganizationMemberByEmail adds a member to an organization by email
     * @param organzationId the organzation id
     * @param email the users email address
     * @returns OrganizationMember array
     */
    public addOrganizationMemberByEmail = async (
        organizationId: string,
        email: string,
        role: OrganizationMemberRole
    ): Promise<OrganizationMember> => {
        const memberRole = { role: role };
        const resp = await axios.post<OrganizationMember>(this.getEndpoint(`/${organizationId}/member/${email}`), memberRole).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * removeOrganizationMemberById removes a member of an organization by email
     * @param organzationId the organzation id
     * @param userId the users id
     */
    public removeOrganizationMemberById = async (organizationId: string, userId: string): Promise<void> => {
        const resp = await axios.delete<void>(this.getEndpoint(`/${organizationId}/member/${userId}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/account/v1/organization${endpoint}`;
    }
}
