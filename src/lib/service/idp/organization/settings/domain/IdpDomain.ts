import Base from "../../../../../base";
import { Domain } from "../../../../../interfaces/IDP";

export class IdpDomain extends Base {
    /**
     * Retrieves all the domains associated with a given organization
     *
     * @param orgName The name of organization
     * @returns a Promise that resolves to an array of domains
     */
    public getDomains = async (orgName: string): Promise<Domain[]> => {
        const resp = await this.axios.get<Domain[]>(this.getEndpoint(`/v1/org/${orgName}/settings/domains`));

        return resp.data;
    };

    /**
     * Associates the organization with the given domain name by creating a new domain object
     *
     * @param orgName Name of the organization
     * @param domainName Domain name. Must be a FQDN
     * @returns the created Domain
     */
    public createDomain = async (orgName: string, domainName: string): Promise<Domain> => {
        const resp = await this.axios.post<Domain>(this.getEndpoint(`/v1/org/${orgName}/settings/domains`), {
            name: domainName,
        });

        return resp.data;
    };

    /**
     * Tries to verify the domain
     *
     * @param orgName Name of the organization
     * @param domainName Domain name
     * @returns the domain. If the verification was successful, domain.verified will equal true
     */
    public verifyDomain = async (orgName: string, domainName: string): Promise<Domain> => {
        const resp = await this.axios.patch<Domain>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/verify`));

        return resp.data;
    };

    /**
     * Deletes a domain
     *
     * @param orgName Name of the organization
     * @param domainName Name of the domain
     */
    public deleteDomain = async (orgName: string, domainName: string): Promise<void> => {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
