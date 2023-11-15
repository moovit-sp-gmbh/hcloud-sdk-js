/**
 * Refers to a GitHub release.
 */
export interface WaveRelease {
    releaseTag: string;
    browserUrl: string;
    latest?: boolean;
}

export interface WaveEngine {
    size: number;
    md5: string;
    content: string;
}

/**
 * Refers to an asset (file) within a GitHub release.
 *
 * A WaveEngineReleaseAsset that belong to a certain WaveRelease will
 * share the same releaseTag and latest value, but will have a different
 * browserUrl since the URL will refer to the specific asset.
 */
export interface WaveEngineReleaseAsset {
    releaseTag: string;
    browserUrl: string;
    latest?: boolean;
}

export interface Registry {
    catalogs: {
        url: string;
        signed?: boolean;
        featured?: boolean;
        default?: boolean;
    }[];
}

export interface Catalog {
    name: string;
    description: string;
    logo?: string;
    versions: string[];
}

export interface Specification {
    nodes: StreamNodeSpecification[];
}

export interface StreamNodeSpecification {
    name: string;
    description: string;
    type: StreamNodeSpecificationType;
    package: StreamNodeSpecificationPackage;
    category: StreamNodeSpecificationCategory;
    version: StreamSemanticVersion;
    customTag?: StreamNodeSpecificationCustomTag;
    author: StreamNodeSpecificationAuthor;
    deprecated?: boolean;
    requireSdk?: boolean;
    inputs?: StreamNodeSpecificationInput[];
    outputs?: StreamNodeSpecificationOutput[];
    additionalConnectors?: StreamNodeSpecificationAdditionalConnector[];
}

export interface StreamSemanticVersion {
    /**
     * changes effecting the user and are not backwards compatible (parameter changes)
     */
    major: number;
    /**
     * changes effecting the user but are backwards compatible (logic changes)
     */
    minor: number;
    /**
     * changes not effecting the user (bug fixes)
     */
    patch: number;
    /**
     * description for every change on the the node
     */
    changelog: string[];
}

export interface StreamNodeSpecificationAdditionalConnector {
    name: string;
    description: string;
}

export interface StreamNodeSpecificationInput {
    name: string;
    description: string;
    type: StreamNodeSpecificationInputOutputType;
    defaultValue?: any;
    example: any;
    advanced?: boolean;
    mandatory?: boolean;
}

export interface StreamNodeSpecificationOutput {
    name: string;
    description: string;
    type: StreamNodeSpecificationInputOutputType;
    example: any;
}

export enum StreamNodeSpecificationInputOutputType {
    STRING = "STRING",
    STRING_LONG = "STRING_LONG",
    STRING_LIST = "STRING_LIST",
    STRING_MAP = "STRING_MAP",
    STRING_READONLY = "STRING_READONLY",
    STRING_SELECT = "STRING_SELECT",

    NUMBER = "NUMBER",

    BOOLEAN = "BOOLEAN",

    ANY = "ANY",
}

export interface StreamNodeSpecificationAuthor {
    name: string;
    company: string;
    email: string;
}

export enum StreamNodeSpecificationType {
    TRIGGER = "TRIGGER",
    ACTION = "ACTION",
    CONDITION = "CONDITION",
}

export enum StreamNodeSpecificationCustomTag {
    DEPRECATED = "DEPRECATED",
    PREVIEW = "PREVIEW",
    EXPERIMENTAL = "EXPERIMENTAL",
}

export enum StreamNodeSpecificationPackage {
    CORE = "CORE",
    DEV = "DEV",
    THIRD_PARTY = "THIRD_PARTY",
    CUSTOM = "CUSTOM",
}
export enum StreamNodeSpecificationCategory {
    FILE_AND_FOLDER = "File & Folder",
    STRING = "String",
    DEMO = "Demo",
    NETWORK = "Network",
    OTHER = "Other",
}
