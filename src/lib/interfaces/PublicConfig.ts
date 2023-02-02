interface Region {
    name: string;
    id: string;
    server: string;
}

export interface PublicConfig {
    reCAPTCHA: string;
    regions: Region[];
}
