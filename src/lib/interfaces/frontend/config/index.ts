export enum AnnouncementType {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
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
    oidcProviders: string[];
}
