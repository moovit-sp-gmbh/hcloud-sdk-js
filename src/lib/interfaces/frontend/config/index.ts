export enum AnnouncementType {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export interface OIDCProvider {
    identifier: "github" | "microsoft" | "google" | "discord" | "apple";
    icon: string;
    enabled: boolean;
}

export interface Announcement {
    type: AnnouncementType;
    message: string;
    showWarning?: boolean;
}

export interface Region {
    name: string;
    id: string;
    server: string;
    icon?: string;
    enabled?: boolean;
    dev?: boolean;
    umami?: { id: string };
    announcement?: Announcement;
}

export interface Config {
    reCAPTCHA: string;
    regions: Region[];
    oidc: OIDCProvider[];
    prefer?: string; // URL to preferred config
}
