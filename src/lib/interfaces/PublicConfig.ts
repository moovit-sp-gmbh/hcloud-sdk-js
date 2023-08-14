export interface Region {
    name: string;
    id: string;
    server: string;
}

export interface Umami {
    id: string;
}

export interface PublicConfig {
    reCAPTCHA: string;
    regions: Region[];
    umami: Umami;
}
