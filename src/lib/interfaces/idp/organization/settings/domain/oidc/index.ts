export interface OIDCProvider {
    clientId: string;
    authorizationEndpoint?: string;
    tokenEndpoint?: string;
    discoveryEndpoint?: string;
}

export type OIDCProviderCreateDto = OIDCProvider & {
    clientSecret: string;
};
