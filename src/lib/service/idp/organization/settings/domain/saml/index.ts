import Base, { MaybeRaw } from "../../../../../../Base";
import { FullSAMLProvider, SAMLProvider, SAMLProviderCreateDto } from "../../../../../../interfaces/idp/organization/settings/domain/saml";

export class IdpSAMLProvider extends Base {
    /**
     * Retrieves all SAML providers associated with a given Organization.
     * @param orgName Name of the Organization
     * @returns Array of SAML providers
     */
    async getAllSAMLProvidersOfOrganization<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, FullSAMLProvider[]>> {
        const resp = await this.axios.get<FullSAMLProvider[]>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/saml`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, FullSAMLProvider[]>;
    }

    /**
     * Creates a new SAML provider for the specified domain.
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @param provider SAML provider object containing the login URL, logout URL, certificates and a boolean to allow unencrypted assertion
     * @returns The created SAML provider
     */
    async createProvider<R extends boolean = false>(
        orgName: string,
        domainName: string,
        provider: SAMLProviderCreateDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, SAMLProvider>> {
        const formData = this.convertProviderToFormData(provider);
        const resp = await this.axios.post<SAMLProvider>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/saml`), formData);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, SAMLProvider>;
    }

    /**
     * Updates a SAML provider for the specified domain
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @param provider SAML provider object containing the login URL, logout URL, certificates and a boolean to allow unencrypted assertion
     * @returns The updated SAML provider
     */
    async updateProvider<R extends boolean = false>(
        orgName: string,
        domainName: string,
        provider: SAMLProviderCreateDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, SAMLProvider>> {
        const formData = this.convertProviderToFormData(provider);
        const resp = await this.axios.put<SAMLProvider>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/saml`), formData);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, SAMLProvider>;
    }

    /**
     * Adds certificates to a SAML provider
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @param certificates Certificates to add
     * @returns The updated SAML provider
     */
    async addCertificatesToProvider<R extends boolean = false>(
        orgName: string,
        domainName: string,
        certificates: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, SAMLProvider>> {
        const formData = new FormData();
        certificates.forEach(c => formData.append("certificate", this.createFileFromString(c)));
        const resp = await this.axios.patch<SAMLProvider>(
            this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/saml/certificates`),
            formData
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, SAMLProvider>;
    }

    /**
     * Removes a SAML provider from the specified domain
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     */
    async deleteProvider<R extends boolean = false>(orgName: string, domainName: string, raw?: { raw: R }): Promise<MaybeRaw<R, SAMLProvider>> {
        const resp = await this.axios.delete<SAMLProvider>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/saml`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, SAMLProvider>;
    }

    private convertProviderToFormData(provider: SAMLProviderCreateDto) {
        const formData = new FormData();
        formData.append("ssoLoginURL", provider.ssoLoginURL);
        formData.append("ssoLogoutURL", provider.ssoLogoutURL);
        provider.certificates.forEach(c => formData.append("certificate", this.createFileFromString(c)));
        provider.allowUnencryptedAssertion && formData.append("allowUnencryptedAssertion", provider.allowUnencryptedAssertion.toString());
        return formData;
    }

    private createFileFromString = (certificate: string) => {
        const blob = new Blob([certificate]);
        return new File([blob], "certificate");
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
