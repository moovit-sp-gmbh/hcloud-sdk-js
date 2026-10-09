import Base, { MaybeRaw } from "../../../../../Base";
import { Domain, DomainPatch, DomainSSOConfig } from "../../../../../interfaces/idp/organization/settings/domain";

export class IdpDomain extends Base {
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
     * @param sso Optional single sign-on configuration, only used for login once the Domain is verified
     * @returns the created Domain
     */
    async createDomain<R extends boolean = false>(
        orgName: string,
        domainName: string,
        sso?: DomainSSOConfig,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Domain>> {
        const resp = await this.axios.post<Domain>(this.getEndpoint(`/v1/org/${orgName}/settings/domains`), {
            name: domainName,
            sso,
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
     * Renames a Domain and/or changes its single sign-on configuration.
     * A renamed Domain is no longer verified and has to be verified again with the same uuid, its SSO configuration is kept.
     * Setting `sso` replaces the whole configuration, `null` removes it. A left out OIDC `clientSecret` keeps the stored one.
     * @param orgName Name of the organization
     * @param domainName Current name of the Domain
     * @param patch New name and/or SSO configuration
     * @returns the updated Domain
     */
    async patchDomain<R extends boolean = false>(
        orgName: string,
        domainName: string,
        patch: DomainPatch,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Domain>> {
        const resp = await this.axios.patch<Domain>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}`), patch);

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
