export interface OIDCProvider {
    clientId: string;
    authorizationEndpoint?: string;
    tokenEndpoint?: string;
    discoveryEndpoint?: string;
}

export type OIDCProviderCreateDto = Pick<OIDCProvider, "clientId"> & { clientSecret: string } & (
        | { discoveryEndpoint: string; authorizationEndpoint?: never; tokenEndpoint?: never }
        | { authorizationEndpoint: string; tokenEndpoint: string; discoveryEndpoint?: never }
    );
