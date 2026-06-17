import Base, { MaybeRaw } from "../../../../../../Base";
import { OIDCProvider, OIDCProviderCreateDto } from "../../../../../../interfaces/idp/organization/settings/domain/oidc";

export class IdpOIDCProvider extends Base {
    /**
     * Retrieves all OIDC providers associated with a given Organization.
     * @param orgName Name of the Organization
     * @returns Array of OIDC providers
     */
    async getAllOIDCProvidersOfOrganization<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, OIDCProvider[]>> {
        const resp = await this.axios.get<OIDCProvider[]>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/oidc`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OIDCProvider[]>;
    }

    /**
     * Creates a new OIDC provider for the specified domain.
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @param provider OIDC provider object containing the login URL, logout URL, certificates and a boolean to allow unencrypted assertion
     * @returns The created OIDC provider
     */
    async createProvider<R extends boolean = false>(
        orgName: string,
        domainName: string,
        provider: OIDCProviderCreateDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OIDCProvider>> {
        const resp = await this.axios.post<OIDCProvider>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/oidc`), provider);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OIDCProvider>;
    }

    /**
     * Patches a OIDC provider for the specified domain
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @param provider Parial OIDC provider object
     * @returns The updated OIDC provider
     */
    async patchProvider<R extends boolean = false>(
        orgName: string,
        domainName: string,
        provider: Partial<OIDCProviderCreateDto>,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, OIDCProvider>> {
        const resp = await this.axios.patch<OIDCProvider>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/oidc`), provider);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, OIDCProvider>;
    }

    /**
     * Removes a OIDC provider from the specified domain
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     */
    async deleteProvider<R extends boolean = false>(orgName: string, domainName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/oidc`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
