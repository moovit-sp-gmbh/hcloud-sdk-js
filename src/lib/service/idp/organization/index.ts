import Base from "../../../Base";
import { Organization, OrganizationQueryOptions } from "../../../interfaces/idp/organization";
import { IdpOrganizationLicense } from "./license";
import { IdpOrganizationMember } from "./member";
import IdpOrganizationSettings from "./settings";
import { IdpOrganizationTeams } from "./team";

export class IdpOrganization extends Base {
    /**
     * Handles everything around organization members
     */
    public get member(): IdpOrganizationMember {
        if (this._member === undefined) {
            this._member = new IdpOrganizationMember(this.options, this.axios);
        }
        return this._member;
    }
    private _member?: IdpOrganizationMember;

    /**
     * Handles everything around organization settings
     */
    public get settings(): IdpOrganizationSettings {
        if (this._settings === undefined) {
            this._settings = new IdpOrganizationSettings(this.options, this.axios);
        }
        return this._settings;
    }
    private _settings?: IdpOrganizationSettings;

    /**
     * Handles everything around teams of organizations.
     */
    public get teams(): IdpOrganizationTeams {
        if (this._teams === undefined) {
            this._teams = new IdpOrganizationTeams(this.options, this.axios);
        }
        return this._teams;
    }
    private _teams?: IdpOrganizationTeams;

    /**
     * Handles everything around licenses.
     */
    public get license(): IdpOrganizationLicense {
        if (this._license === undefined) {
            this._license = new IdpOrganizationLicense(this.options, this.axios);
        }
        return this._license;
    }
    private _license?: IdpOrganizationLicense;

    /**
     * Updates an Organization.
     * @param orgName Current name of the Organization
     * @param newName New name for the organization
     * @param company (optional) New company name
     * @returns The updated Organization
     */
    async updateOrganization(orgName: string, newName: string, company?: string): Promise<Organization> {
        const organization = { name: newName, company: company } as Organization;
        const resp = await this.axios.patch<Organization>(this.getEndpoint(`/v1/org/${orgName}`), organization);

        return resp.data;
    }

    /**
     * Creates a new Organization.
     * @param name Name of the new Organization
     * @param company (optional) Company name for the new Organization
     * @returns The created Organization
     */
    async createOrganization(name: string, company?: string): Promise<Organization> {
        const organization = { name: name, company: company } as Organization;
        const resp = await this.axios.post<Organization>(this.getEndpoint(`/v1/org`), organization);

        return resp.data;
    }

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
    async deleteOrganization(orgName: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
