export interface FullSAMLProvider {
    domainName: string;
    ssoLoginURL: string;
    ssoLogoutURL: string;
    certificates: string[];
    allowUnencryptedAssertion: boolean;
}

export interface SAMLProvider {
    ssoLoginURL: string;
    ssoLogoutURL: string;
    certificates: string[];
    allowUnencryptedAssertion: boolean;
}

export interface SAMLProviderCreateDto {
    ssoLoginURL: string;
    ssoLogoutURL: string;
    certificates: string[];
    allowUnencryptedAssertion?: boolean;
}
