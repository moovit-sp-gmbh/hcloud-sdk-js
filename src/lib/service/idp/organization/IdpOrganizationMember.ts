import { AxiosInstance } from "axios";
import base from "../../../base";
import { AddOrganizationMember, OrganizationMember, OrganizationPermission, PatchOrgMember } from "../../../interfaces/IDP";

export class IdpOrganizationMember extends base {
    /**
     * listOrganizationMembersById requests all organization members
     * @param id the organzation id
     * @param limit an opitional response limit (1-1000; dafaults to 500)
     * @param page an opitional page to skip certain results (page * limit; defaults to 0)
     * @returns OrganizationMember array
     */
    public listOrganizationMembers = async (id: string, limit?: number, page?: number): Promise<[OrganizationMember[], number]> => {
        limit = limit || 500;
        page = page || 0;

        const resp = await this.axios.get<OrganizationMember[]>(this.getEndpoint(`/${id}/member?limit=${limit}&page=${page}`)).catch((err: Error) => {
            throw err;
        });

        return [resp.data, parseInt(String(resp.headers["total"]), 10)];
    };

    /**
     * addOrganizationMember adds a member to an organization
     * @returns OrganizationMember array
     */
    public addOrganizationMember = async (organizationId: string, addOrganizationMember: AddOrganizationMember): Promise<OrganizationMember> => {
        const resp = await this.axios
            .post<OrganizationMember>(this.getEndpoint(`/${organizationId}/member`), addOrganizationMember)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    /**
     * patchOrganizationMemberPermission patches a members permission in an organization
     * @param organzationId the organzation id
     * @param userId the users id
     * @returns OrganizationMember array
     */
    public patchOrganizationMemberPermission = async (organizationId: string, patchOrgMember: PatchOrgMember): Promise<OrganizationMember> => {
        const resp = await this.axios.patch<OrganizationMember>(this.getEndpoint(`/${organizationId}/member`), patchOrgMember).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * removeOrganizationMember removes a member from an organization
     * @param userId
     */
    public removeOrganizationMember = async (organizationId: string, userId: string): Promise<void> => {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/${organizationId}/member/${userId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * validateMemberPermission validates whether the current user has the provided permission in the specified organization
     * @param organizationId the organization id
     * @returns provided permission if valid, else throws error
     */
    public validateMemberPermission = async (organizationId: string, permission: OrganizationPermission): Promise<OrganizationPermission> => {
        const resp = await this.axios.get<OrganizationPermission>(this.getEndpoint(`/${organizationId}/member/validate?permission=${permission}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/organization${endpoint}`;
    }
}
