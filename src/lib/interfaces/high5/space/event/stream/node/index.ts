import { ReducedOrganization } from "../../../../../idp/organization";
import { ReducedUser } from "../../../../../idp/user";
import { StreamNodeSpecificationInputType, StreamNodeSpecificationOutputType } from "../../../../wave";

export enum NodeCategory {
    CUSTOM = "CUSTOM",
}

export enum NodeType {
    CUSTOM = "CUSTOM",
    CATALOG = "CATALOG",
}
export interface Node {
    _id: string;
    secret: string;
    category: NodeCategory;
    organization: ReducedOrganization;
    archived: boolean;
    space: string;
    event: string;
    streamId: string;
    creator: ReducedUser;
    specification: string;
    typescript: string;
    javascript: string;
    /**
     * UTC+0 unix timestamp
     */
    createDate: number;
    modifyDate: number;
}

export interface StreamNodeResolvedInputs {
    name: string;
    originalValue: unknown;
    value: unknown;
    type: StreamNodeSpecificationInputType;
    error: boolean;
    errorMessage: string;
}

export interface StreamNodeOutput {
    name: string | undefined;
    value: unknown;
    type: StreamNodeSpecificationOutputType;
}

export interface StreamNodeResultError {
    code: number;
    message: string;
    detail?: string;
    trace: string | undefined;
}

export interface StreamSingleNodeResult {
    uuid: string;
    nodeUuid: string;
    failed: boolean;
    startTimestamp: number;
    endTimestamp?: number;
    name: string;
    inputs?: StreamNodeResolvedInputs[];
    outputs?: StreamNodeOutput[];
    error?: StreamNodeResultError;
    logs?: string[];
    duration?: number;
    bypassed?: boolean;
    nodeResults?: StreamSingleNodeResult[];
    info?: NodeInfo;
    waiting?: boolean;
    color: string;
    nodeType: NodeType;
}

type NodeInfo = {
    runTime: number;
    catalog: {
        name?: string;
        _id?: string;
        url: string;
        version: string;
    };
    color?: string;
    nodeType?: NodeType;
};

export interface StreamNodeAdditionalConnector {
    name: string;
    targetUuid: string;
}
