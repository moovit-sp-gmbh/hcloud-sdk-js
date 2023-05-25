import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { Organization, OrganizationWithPermission } from "../../../interfaces/IDP";
import { IdpOrganizationMember } from "./IdpOrganizationMember";
import { IdpDomain } from "./settings/domain/IdpDomain";
import { IdpOrganizationTeams } from "./IdpOrganizationTeams";
import { IdpOAuthApp } from "./settings/oauth/IdpOAuthApp";

export class IdpOrganization extends base {
    /**
     * member handles everything around organization members
     */
    public member: IdpOrganizationMember;

    /**
     * domains handles everything around domains of organizations.
     */
    public domains: IdpDomain;

    /**
     * teams handles everything around teams of organizations.
     */
    public teams: IdpOrganizationTeams;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.member = new IdpOrganizationMember(this.options, this.axios);
        this.domains = new IdpDomain(this.options, this.axios);
        this.teams = new IdpOrganizationTeams(this.options, this.axios);
    }

    /**
     * updateOrganization update an organization
     * @param orgName the organization name
     * @param newName the new name for the organization
     * @param company an optional company for the new organization
     * @returns Organization object
     */
    public updateOrganization = async (orgName: string, newName: string, company?: string): Promise<Organization> => {
        const organization = { name: newName, company: company } as Organization;
        const resp = await this.axios.patch<Organization>(this.getEndpoint(`/v1/org/${orgName}`), organization).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * createOrganization creates a new organization
     * @param name a name for the new organization
     * @param company an optional company for the new organization
     * @returns Organization object
     */
    public createOrganization = async (name: string, company?: string): Promise<Organization> => {
        const organization = { name: name, company: company } as Organization;
        const resp = await this.axios.post<Organization>(this.getEndpoint(`/v1/org`), organization).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * getOrganizationByName requests an organization by it's name
     * @param orgName the organization name
     * @returns Organization object
     */
    public getOrganizationByName = async (orgName: string): Promise<OrganizationWithPermission> => {
        const resp = await this.axios.get<OrganizationWithPermission>(this.getEndpoint(`/v1/org/${orgName}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteOrganizationByName delete an organization by it's name
     * @param orgName the organization name
     * @returns 204 no content
     */
    public deleteOrganizationByName = async (orgName: string): Promise<void> => {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
