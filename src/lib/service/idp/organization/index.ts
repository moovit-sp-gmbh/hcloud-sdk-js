import Base, { MaybeRaw } from "../../../Base";
import { Organization, OrganizationQueryOptions } from "../../../interfaces/idp/organization";
import { IdpOrganizationLicense } from "./license";
import { IdpOrganizationMember } from "./member";
import IdpOrganizationServiceAccounts from "./service-accounts";
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
     * Handles everything around organization service accounts
     */
    public get serviceAccounts(): IdpOrganizationServiceAccounts {
        if (this._serviceAccounts === undefined) {
            this._serviceAccounts = new IdpOrganizationServiceAccounts(this.options, this.axios);
        }
        return this._serviceAccounts;
    }
    private _serviceAccounts?: IdpOrganizationServiceAccounts;

    /**
     * Updates an Organization.
     * @param orgName Current name of the Organization
     * @param newName New name for the organization
     * @param company (optional) New company name
     * @returns The updated Organization
     */
    async updateOrganization<R extends boolean = false>(
        orgName: string,
        newName: string,
        company?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Organization>> {
        const organization = { name: newName, company: company } as Organization;
        const resp = await this.axios.patch<Organization>(this.getEndpoint(`/v1/org/${orgName}`), organization);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Organization>;
    }

    /**
     * Creates a new Organization.
     * @param name Name of the new Organization
     * @param company (optional) Company name for the new Organization
     * @returns The created Organization
     */
    async createOrganization<R extends boolean = false>(name: string, company?: string, raw?: { raw: R }): Promise<MaybeRaw<R, Organization>> {
        const organization = { name: name, company: company } as Organization;
        const resp = await this.axios.post<Organization>(this.getEndpoint(`/v1/org`), organization);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Organization>;
    }

    /**
     * Retrieves an Organization by its name.
     * @param orgName Name of the Organization
     * @param options Defines query options to retrieve additional properties in the response
     * @returns The requested Organization
     */
    public async getOrganization<R extends boolean = false>(
        orgName: string,
        options?: OrganizationQueryOptions,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Organization>> {
        const resp = await this.axios.get<Organization>(this.getEndpoint(`/v1/org/${orgName}`), {
            params: {
                teamsOfUser: options?.getTeamsOfUser,
                totalMemberCount: options?.getTotalMemberCount,
                membersSample: options?.getMembersSample,
                license: options?.getLicense,
            },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Organization>;
    }

    /**
     * Deletes an Organization. This will also delete all dependencies that the Organization has (Teams, Spaces, apps, ...).
     * @param orgName Name of the Organization to be deleted
     */
    async deleteOrganization<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
