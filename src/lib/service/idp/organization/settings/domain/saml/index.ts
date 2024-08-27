import Base from "../../../../../../Base";
import { FullSAMLProvider, SAMLProvider, SAMLProviderCreateDto } from "../../../../../../interfaces/idp/organization/settings/domain/saml";

export class IdpSAMLProvider extends Base {
    /**
     * Retrieves all SAML providers associated with a given Organization.
     * @param orgName Name of the Organization
     * @returns Array of SAML providers
     */
    public getAllSAMLProvidersOfOrganization = async (orgName: string): Promise<FullSAMLProvider[]> => {
        const resp = await this.axios.get<FullSAMLProvider[]>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/saml`));

        return resp.data;
    };

    /**
     * Creates a new SAML provider for the specified domain.
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @param provider SAML provider object containing the login URL, logout URL, certificates and a boolean to allow unencrypted assertion
     * @returns The created SAML provider
     */
    public createProvider = async (orgName: string, domainName: string, provider: SAMLProviderCreateDto): Promise<SAMLProvider> => {
        const formData = this.convertProviderToFormData(provider);
        const resp = await this.axios.post<SAMLProvider>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/saml`), formData);

        return resp.data;
    };

    /**
     * Updates a SAML provider for the specified domain
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @param provider SAML provider object containing the login URL, logout URL, certificates and a boolean to allow unencrypted assertion
     * @returns The updated SAML provider
     */
    public updateProvider = async (orgName: string, domainName: string, provider: SAMLProviderCreateDto): Promise<SAMLProvider> => {
        const formData = this.convertProviderToFormData(provider);
        const resp = await this.axios.put<SAMLProvider>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/saml`), formData);

        return resp.data;
    };

    /**
     * Adds certificates to a SAML provider
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     * @param certificates Certificates to add
     * @returns The updated SAML provider
     */
    public addCertificatesToProvider = async (orgName: string, domainName: string, certificates: string[]): Promise<SAMLProvider> => {
        const formData = new FormData();
        certificates.forEach(c => formData.append("certificate", this.createFileFromString(c)));
        const resp = await this.axios.patch<SAMLProvider>(
            this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/saml/certificates`),
            formData
        );

        return resp.data;
    };

    /**
     * Removes a SAML provider from the specified domain
     * @param orgName Name of the Organization
     * @param domainName Name of the Domain
     */
    public deleteProvider = async (orgName: string, domainName: string): Promise<void> => {
        await this.axios.delete<SAMLProvider>(this.getEndpoint(`/v1/org/${orgName}/settings/domains/${domainName}/saml`));
    };

    private convertProviderToFormData = (provider: SAMLProviderCreateDto) => {
        const formData = new FormData();
        formData.append("ssoLoginURL", provider.ssoLoginURL);
        formData.append("ssoLogoutURL", provider.ssoLogoutURL);
        provider.certificates.forEach(c => formData.append("certificate", this.createFileFromString(c)));
        provider.allowUnencryptedAssertion && formData.append("allowUnencryptedAssertion", provider.allowUnencryptedAssertion.toString());
        return formData;
    };

    private createFileFromString = (certificate: string) => {
        const blob = new Blob([certificate]);
        return new File([blob], "certificate");
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
