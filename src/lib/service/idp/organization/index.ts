import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { Organization, OrganizationQueryOptions } from "../../../interfaces/idp/organization";
import { IdpOrganizationMember } from "./member";
import { IdpOrganizationTeams } from "./team";
import IdpOrganizationSettings from "./settings";
import { IdpOrganizationLicense } from "./license";

export class IdpOrganization extends Base {
    /**
     * Handles everything around organization members
     */
    public member: IdpOrganizationMember;

    /**
     * Handles everything around organization settings
     */
    public settings: IdpOrganizationSettings;

    /**
     * Handles everything around teams of organizations.
     */
    public teams: IdpOrganizationTeams;

    /**
     * Handles everything around licenses.
     */
    public license: IdpOrganizationLicense;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.member = new IdpOrganizationMember(this.options, this.axios);
        this.teams = new IdpOrganizationTeams(this.options, this.axios);
        this.settings = new IdpOrganizationSettings(this.options, this.axios);
        this.license = new IdpOrganizationLicense(this.options, this.axios);
    }

    /**
     * Updates an Organization.
     * @param orgName Current name of the Organization
     * @param newName New name for the organization
     * @param company (optional) New company name
     * @returns The updated Organization
     */
    public updateOrganization = async (orgName: string, newName: string, company?: string): Promise<Organization> => {
        const organization = { name: newName, company: company } as Organization;
        const resp = await this.axios.patch<Organization>(this.getEndpoint(`/v1/org/${orgName}`), organization);

        return resp.data;
    };

    /**
     * Creates a new Organization.
     * @param name Name of the new Organization
     * @param company (optional) Company name for the new Organization
     * @returns The created Organization
     */
    public createOrganization = async (name: string, company?: string): Promise<Organization> => {
        const organization = { name: name, company: company } as Organization;
        const resp = await this.axios.post<Organization>(this.getEndpoint(`/v1/org`), organization);

        return resp.data;
    };

    /**
     * Retrieves an Organization by its name.
     * @param orgName Name of the Organization
     * @param options Defines query options to retrieve additional properties in the response
     * @returns The requested Organization
     */
    public async getOrganization(orgName: string, options?: OrganizationQueryOptions): Promise<Organization> {
        const resp = await this.axios.get<Organization>(this.getEndpoint(`/v1/org/${orgName}`), {
            params: {
                teamsOfUser: options?.getTeamsOfUser,
                totalMemberCount: options?.getTotalMemberCount,
                membersSample: options?.getMembersSample,
                license: options?.getLicense,
            },
        });

        return resp.data;
    }

    /**
     * Deletes an Organization. This will also delete all dependencies that the Organization has (Teams, Spaces, apps, ...).
     * @param orgName Name of the Organization to be deleted
     */
    public deleteOrganization = async (orgName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
