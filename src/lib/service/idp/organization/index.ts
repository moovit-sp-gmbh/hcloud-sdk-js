import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { Organization, OrganizationWithPermission, OrganizationWithPermissionAndTeams } from "../../../interfaces/idp/organization";
import { IdpOrganizationMember } from "./member";
import { IdpOrganizationTeams } from "./team";
import IdpOrganizationSettings from "./settings";

export class IdpOrganization extends Base {
    /**
     * member handles everything around organization members
     */
    public member: IdpOrganizationMember;

    /**
     * settings handles everything around organization settings
     */
    public settings: IdpOrganizationSettings;

    /**
     * teams handles everything around teams of organizations.
     */
    public teams: IdpOrganizationTeams;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.member = new IdpOrganizationMember(this.options, this.axios);
        this.teams = new IdpOrganizationTeams(this.options, this.axios);
        this.settings = new IdpOrganizationSettings(this.options, this.axios);
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
     * getOrganization requests an organization by it's name
     * @param orgName the organization name
     * @param [options] options object
     * @param [options.teams] True if the response object should hold the teams of the organization
     * that the user is a part of
     * @returns Organization object
     */
    /* eslint-disable no-dupe-class-members */
    public async getOrganization(orgName: string, options: undefined): Promise<OrganizationWithPermission>;
    public async getOrganization(orgName: string, options: { teams: false }): Promise<OrganizationWithPermission>;
    public async getOrganization(orgName: string, options: { teams: true }): Promise<OrganizationWithPermissionAndTeams>;
    public async getOrganization(
        orgName: string,
        options?: { teams: boolean }
    ): Promise<OrganizationWithPermission | OrganizationWithPermissionAndTeams> {
        let resp;
        if (options?.teams) {
            resp = await this.axios
                .get<OrganizationWithPermissionAndTeams>(this.getEndpoint(`/v1/org/${orgName}`), {
                    params: {
                        teams: options.teams,
                    },
                })
                .catch((err: Error) => {
                    throw err;
                });
        } else {
            resp = await this.axios.get<OrganizationWithPermission>(this.getEndpoint(`/v1/org/${orgName}`)).catch((err: Error) => {
                throw err;
            });
        }

        return resp.data;
    }
    /* eslint-enable no-dupe-class-members */

    /**
     * deleteOrganization delete an organization by it's name
     * @param orgName the organization name
     * @returns 204 no content
     */
    public deleteOrganization = async (orgName: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
