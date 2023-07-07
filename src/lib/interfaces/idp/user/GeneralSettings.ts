import { Views } from "../../Global";

export enum Language {
    ENGLISH = "en",
    GERMAN = "de",
}

export function languagefromTag(tag?: string): Language | undefined {
    if (!tag) return undefined;
    return Object.values(Language).find(v => v === tag);
}

export enum DateFormat {
    ISO_8601_24 = "YYYY-MM-DDTHH:mm:ss",
    ISO_8601_12 = "YYYY-MM-DD hh:mm:ss a",
    US_12 = "MM/DD/YYYY hh:mm:ss a",
    US_LONG_12 = "Day, Month DD, YYYY at hh:mm:ss a",
    EU_24 = "DD/MM/YYYY HH:mm:ss",
    EU_LONG = "Day DD Month YYYY at HH:mm:ss",
    GERMAN_24 = "DD.MM.YYYY HH:mm:ss",
    GERMAN_LONG = "Day, DD. Month YYYY at HH:mm:ss",
}

export enum Theme {
    DARK = "DARK",
    LIGHT = "LIGHT",
    SYSTEM_DEFAULT = "SYSTEM_DEFAULT",
    HIGH_CONTRAST = "HIGH_CONTRAST",
}

export enum Entrypoint {
    DEFAULT = "DEFAULT",
    HIGH5 = "HIGH5",
    FUSE = "FUSE",
    LAST_VISITED = "LAST_VISITED",
}

export interface GeneralSettings {
    _id: string;
    userId: string;
    lastUrl: string;
    lastView: Views;
    timezone: string;
    language: Language;
    dateFormat: DateFormat;
    theme: Theme;
    entrypoint: Entrypoint;
}

export interface GeneralSettingsPatch {
    lastUrl?: string;
    lastView?: Views;
    timezone?: string;
    language?: Language;
    entrypoint?: Entrypoint;
    dateFormat?: DateFormat;
    theme?: Theme;
}
