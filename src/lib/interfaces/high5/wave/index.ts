export interface CatalogRegistry {
    catalogs: {
        url: string;
        signed?: boolean;
        featured?: boolean;
        default?: boolean;
    }[];
}

export interface EngineRegistry {
    engines: {
        url: string;
    }[];
}

export interface WaveEngine {
    _id: string;
    version: string;
    url: string;
    changeLog: string[];
    md5: string;
    dev?: boolean;
}

export interface WaveCatalog {
    _id: string;
    version: string;
    url: string;
    changeLog: string[];
    dev?: boolean;
}

export interface Engine {
    name: string;
    description: string;
    logo?: string;
    versions: WaveEngine[];
}

export interface Catalog {
    name: string;
    description: string;
    logo?: string;
    versions: WaveCatalog[];
}

export interface SpacePatchWaveEngine {
    version: string;
    url: string;
}

export interface SpacePatchWaveCatalog {
    version: string;
    url: string;
}

export interface Specification {
    nodes: StreamNodeSpecification[];
}

export interface StreamNodeSpecification {
    name: string;
    description: string;
    documentation: string;
    type: StreamNodeSpecificationType;
    package: StreamNodeSpecificationPackage;
    category: string;
    version: StreamSemanticVersion;
    author: StreamNodeSpecificationAuthor;
    tag?: StreamNodeSpecificationTag;
    requireSdk?: boolean;
    inputs?: StreamNodeSpecificationInput[];
    outputs?: StreamNodeSpecificationOutput[];
    additionalConnectors?: StreamNodeSpecificationAdditionalConnector[];
    path?: string;
    customNode?: StreamCustomNodeSpecification;
}

export interface StreamCustomNodeSpecification {
    _id: string;
    color?: string;
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

export type StreamNodeSpecificationInput = {
    name: string;
    description: string;
    defaultValue?: any;
    example: any;
    advanced?: boolean;
    mandatory?: boolean;
} & (
    | {
          type: Exclude<StreamNodeSpecificationInputType, StreamNodeSpecificationInputType.STRING_SELECT>;
      }
    | {
          type: StreamNodeSpecificationInputType.STRING_SELECT;
          options: Record<string, string | number>;
      }
);

export interface StreamNodeSpecificationOutput {
    name: string;
    description: string;
    type: StreamNodeSpecificationOutputType;
    example: unknown;
    howToAccess: string[];
}

export enum StreamNodeSpecificationInputType {
    STRING = "STRING",
    STRING_LONG = "STRING_LONG",
    STRING_LIST = "STRING_LIST",
    STRING_MAP = "STRING_MAP",
    STRING_READONLY = "STRING_READONLY",
    STRING_SELECT = "STRING_SELECT",
    STRING_PASSWORD = "STRING_PASSWORD",

    NUMBER = "NUMBER",

    BOOLEAN = "BOOLEAN",

    ANY = "ANY",
}

export enum StreamNodeSpecificationOutputType {
    STRING = "STRING",
    STRING_LONG = "STRING_LONG",
    STRING_LIST = "STRING_LIST",
    STRING_MAP = "STRING_MAP",
    STRING_READONLY = "STRING_READONLY",

    NUMBER = "NUMBER",

    BOOLEAN = "BOOLEAN",

    ANY = "ANY",
    JSON = "JSON",
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

export enum StreamNodeSpecificationTag {
    PREVIEW = "PREVIEW",
    EXPERIMENTAL = "EXPERIMENTAL",
}

export enum StreamNodeSpecificationPackage {
    CORE = "CORE",
    DEV = "DEV",
    THIRD_PARTY = "THIRD_PARTY",
    CUSTOM = "CUSTOM",
}
