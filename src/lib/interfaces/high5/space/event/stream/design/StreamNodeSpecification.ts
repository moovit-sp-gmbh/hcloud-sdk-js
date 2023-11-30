export interface StreamNodeSpecification {
    name: string;
    description: string;
    type: StreamNodeSpecificationType;
    package: StreamNodeSpecificationPackage;
    category: StreamNodeSpecificationCategory;
    version: StreamSemanticVersion;
    author: StreamNodeSpecificationAuthor;
    deprecated?: boolean;
    inputs?: StreamNodeSpecificationInput[];
    outputs?: StreamNodeSpecificationOutput[];
    additionalConnectors?: StreamNodeSpecifiationAdditionalConnector[];
    customTag?: StreamNodeSpecifiationCustomTag;
    requireSdk?: boolean;
    path: string;
    customNode?: StreamCustomNodeSpecification;
}

export interface StreamCustomNodeSpecification {
    _id: string;
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

export interface StreamNodeSpecifiationAdditionalConnector {
    name: string;
    description: string;
}

export type StringMap = {
    [key: string]: string;
};

export interface StreamNodeSpecificationInput {
    name: string;
    description: string;
    type: StreamNodeSpecificationInputOutputType;
    defaultValue?: string | number | boolean | string[] | StringMap[] | StringMap;
    example: string | number | boolean | string[] | StringMap[] | StringMap;
    mandatory?: boolean;
    advanced?: boolean;
}

export interface StreamNodeSpecificationOutput {
    name: string;
    description: string;
    type: StreamNodeSpecificationInputOutputType;
    example: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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

export enum StreamNodeSpecifiationCustomTag {
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
