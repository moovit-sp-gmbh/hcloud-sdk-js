import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { Domain } from "../../../../../interfaces/idp/organization/settings/domain";
import { IdpSAMLProvider } from "./saml";

export class IdpDomain extends Base {
    /**
     * Handles everything around a SAML provider of a domain.
     */
    public samlProvider: IdpSAMLProvider;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.samlProvider = new IdpSAMLProvider(this.options, this.axios);
    }

    /**
     * Retrieves all the Domains associated with a given Organization.
     * @param orgName Name of Organization
     * @returns Array of Domains
     */
    async getDomains(orgName: string): Promise<Domain[]> {
        const resp = await this.axios.get<Domain[]>(this.getEndpoint(`/v1/org/${orgName}/settings/domains`));

        return resp.data;
    }

    /**
     * Creates a new Domain for the given Organization
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @returns the created Domain
     */
    async createDomain(orgName: string, domainName: string): Promise<Domain> {
        const resp = await this.axios.post<Domain>(this.getEndpoint(`/v1/org/${orgName}/settings/domains`), {
            name: domainName,
        });

        return resp.data;
    }

    /**
     * Verifies the provided Domain.
     * @param orgName Name of the organization
     * @param domainName Name of the Domain
     * @returns Domain object with domain.verified set to 'true' if verification was succesful.
     */
    async verifyDomain(orgName: string, domainName: string): Promise<Domain> {
        const resp = await this.axios.patch<Domain>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/verify`));

        return resp.data;
    }

    /**
     * Deletes a domain.
     * @param orgName Name of the organization
     * @param domainName Name of the domain
     */
    async deleteDomain(orgName: string, domainName: string): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
