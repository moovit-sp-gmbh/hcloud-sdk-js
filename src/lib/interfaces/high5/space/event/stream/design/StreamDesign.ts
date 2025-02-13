import { StreamCustomNodeSpecification, StreamNodeSpecificationInputType, StreamSemanticVersion } from "../../../../wave";

export interface CanvasDimensions {
    width: number;
    height: number;
}

export interface DesignContent {
    nodes: DesignerNode[];
    links: DesignerLink[];
    canvas: CanvasDimensions;
}

export interface DesignerNode {
    name: string;
    originalName: string;
    description: string;
    customDescription?: string;
    kind: DesignerNodeKind;
    color: string;
    bypass?: boolean;
    version: StreamSemanticVersion;
    uuid: string;
    connectors: DesignerNodeConnector[];
    inputs: DesignerNodeInput[];
    coords: DesignerNodeCoords;
    path: string;
    catalog: DesignerNodeCatalog;
    customNode?: StreamCustomNodeSpecification; // customNodes are being created within the Stream Designer and are not part of the default NodeCatalogue
    breakpoint?: boolean;
}

export interface DesignerNodeCatalog {
    url: string;
}

export type StringMap = {
    [key: string]: string;
};

export interface DesignerNodeInput {
    uuid: string;
    name: string;
    description: string;
    advanced?: boolean;
    type: StreamNodeSpecificationInputType;
    selectedLanguage?: StringMap;
    example: string | number | boolean | string[] | StringMap | StringMap[]; // type string can have placeholders (represented as input placeholders in web)
    value?: string | number | boolean | string[] | StringMap | StringMap[]; // the entered value
    mandatory?: boolean;
}

export interface DesignerNodeConnector {
    name: string;
    description: string;
    uuid: string;
    io: DesignerNodeConnectorIO;
    type: DesignerNodeConnectorType;
}

export enum DesignerNodeConnectorIO {
    INPUT = "INPUT",
    OUTPUT = "OUTPUT",
}
export enum DesignerNodeConnectorType {
    TRIGGER = "TRIGGER",
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    CUSTOM = "CUSTOM",
}

export interface DesignerNodeCoords {
    currentX: number;
    currentY: number;
    initialX: number;
    initialY: number;
}

export enum DesignerNodeKind {
    NODE = "NODE",
    ANNOTATION = "ANNOTATION",
}

// Annotation extension

export interface DesignerNodeAnnotation extends DesignerNode {
    title: string;
    kind: DesignerNodeKind;
    size: DesignerNodeAnnotationSize;
    color: string;
    background: string;
    contentColor?: string;
}

export interface DesignerNodeAnnotationSize {
    width: number;
    height: number;
}

export interface DesignerLink {
    uuid: string;
    from: DesignerLinkOrigin;
    to: DesignerLinkOrigin;
}

export interface DesignerLinkOrigin {
    nodeUuid: string;
    connectorUuid: string;
}
