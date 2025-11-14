import Base, { MaybeRaw } from "../../../../../Base";
import { Domain } from "../../../../../interfaces/idp/organization/settings/domain";
import { IdpSAMLProvider } from "./saml";

export class IdpDomain extends Base {
    /**
     * Handles everything around a SAML provider of a domain.
     */
    public get samlProvider(): IdpSAMLProvider {
        if (this._samlProvider === undefined) {
            this._samlProvider = new IdpSAMLProvider(this.options, this.axios);
        }
        return this._samlProvider;
    }
    private _samlProvider?: IdpSAMLProvider;

    /**
     * Retrieves all the Domains associated with a given Organization.
     * @param orgName Name of Organization
     * @returns Array of Domains
     */
    async getDomains<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, Domain[]>> {
        const resp = await this.axios.get<Domain[]>(this.getEndpoint(`/v1/org/${orgName}/settings/domains`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Domain[]>;
    }

    /**
     * Creates a new Domain for the given Organization
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @returns the created Domain
     */
    async createDomain<R extends boolean = false>(orgName: string, domainName: string, raw?: { raw: R }): Promise<MaybeRaw<R, Domain>> {
        const resp = await this.axios.post<Domain>(this.getEndpoint(`/v1/org/${orgName}/settings/domains`), {
            name: domainName,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Domain>;
    }

    /**
     * Verifies the provided Domain.
     * @param orgName Name of the organization
     * @param domainName Name of the Domain
     * @returns Domain object with domain.verified set to 'true' if verification was succesful.
     */
    async verifyDomain<R extends boolean = false>(orgName: string, domainName: string, raw?: { raw: R }): Promise<MaybeRaw<R, Domain>> {
        const resp = await this.axios.patch<Domain>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/verify`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Domain>;
    }

    /**
     * Deletes a domain.
     * @param orgName Name of the organization
     * @param domainName Name of the domain
     */
    async deleteDomain<R extends boolean = false>(orgName: string, domainName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
