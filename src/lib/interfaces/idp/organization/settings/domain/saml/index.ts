export interface SAMLProvider {
    ssoLoginURL: string;
    ssoLogoutURL: string;
    certificates: string[];
    allowUnencryptedAssertion: boolean;
}

export interface FullSAMLProvider extends SAMLProvider {
    domainName: string;
}

export type SAMLProviderCreateDto = Omit<SAMLProvider, "allowUnencryptedAssertion"> & Partial<Pick<SAMLProvider, "allowUnencryptedAssertion">>;
