import { ReducedUser } from ".";
import { Views } from "../../global/Views";

export enum Language {
    ENGLISH = "en",
    GERMAN = "de",
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
    user: ReducedUser;
    lastUrl: string;
    lastView: Views;
    timezone: string;
    language: Language;
    dateFormat: DateFormat;
    theme: Theme;
    entrypoint: Entrypoint;
}

export type GeneralSettingsPatch = Partial<Omit<GeneralSettings, "_id" | "user">>;