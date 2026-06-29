import { StreamNodeSpecification, StreamNodeSpecificationInput, StreamNodeSpecificationInputType, StreamNodeSpecificationOutputType } from ".";
import { HCloud } from "../../../Hcloud";
import { StreamResult } from "../space/event/stream";
import { StreamNodeResolvedInputs, StreamNodeResultError } from "../space/event/stream/node";
import { StreamNode } from "../space/execution";

// ─── Enums ───────────────────────────────────────────────────────────────────

export enum DuplicateFileOption {
    FAIL = "Fail",
    SKIP = "Skip",
    OVERWRITE = "Overwrite",
    RENAME_EXISTING = "Rename Existing",
    INCREMENT_NAME = "Increment Name",
}

export enum DuplicateFolderOption {
    FAIL = "Fail",
    SKIP = "Skip",
    RENAME_EXISTING = "Rename Existing",
    INCREMENT_NAME = "Increment Name",
}

// ─── Stream node models ───────────────────────────────────────────────────────

export interface StreamNodeOutput {
    name: string | undefined;
    value: any;
    type: StreamNodeSpecificationOutputType;
}

export interface StreamNodeInput {
    name: string;
    originalValue?: any;
    value: any;
    type: StreamNodeSpecificationInputType;
    error: boolean;
    errorMessage: string;
}

export interface StreamNodeAdditionalConnector {
    name: string;
    targetUuid: string;
}

export interface StreamNodeResolvedInput extends StreamNodeResolvedInputs {
    originalValue: any;
    value: any;
    error: boolean;
    errorMessage: string;
}

// ─── Wave nested interfaces ───────────────────────────────────────────────────

export interface WaveGeneral {
    getNodeUuid(): string;
    resolveValue(value: string): unknown;
    getNodeSpecification(): StreamNodeSpecification;
    cancelExecution(): void;
    isCanceled(): boolean;
    getHcloudClient(): HCloud;
    getOrgName(): string;
    getSpaceName(): string;
    setStreamMessage(message: string): void;
    getAgentContext(): unknown;
    isDebug(): boolean;
}

export interface WaveLogger {
    getCurrentProgress(): number | undefined;
    getCurrentMessage(): string | undefined;
    updateProgress(progress: number): void;
    updateMessage(message: string): void;
    updateProgressAndMessage(progress: number, message: string): void;
    addNodeLog(logMessage: string): void;
}

export interface WaveInputs {
    getInputs(): StreamNodeResolvedInput[];
    getInputByName(inputName: string): StreamNodeResolvedInput | undefined;
    getPreresolvedInputByName(inputName: string): StreamNodeSpecificationInput | undefined;
    getInputValueByInputName(inputName: string): any;
    getInputOriginalValueByInputName(inputName: string): any;
}

type FileFolderReturnObject = {
    finalPath: string;
    srcChecksum?: string;
};

export interface WaveOutputs {
    getAllOutputs(): StreamNodeOutput[];
    getOutputByName(outputName: string): StreamNodeOutput | undefined;
    getOutputValueByOutputName(outputName: string): any;
    setOutput(name: string, value: any, type?: StreamNodeSpecificationOutputType): void;
    executeAdditionalConnector(connectorName: string): Promise<StreamResult | undefined>;
}

export interface WaveFileAndFolderHelper {
    createFile(filePath: string, duplicateFileOption: DuplicateFileOption): Promise<string>;
    createFolder(folderPath: string, duplicateFolderOption: DuplicateFolderOption): Promise<string>;
    copyFile<T extends boolean | undefined = undefined>(
        srcFilePath: string,
        destFilePath: string,
        duplicateFileOption: DuplicateFileOption,
        progressCallback?: (percent: number) => void,
        getSrcChecksum?: T,
        abortSignal?: AbortSignal
    ): Promise<T extends undefined ? string : FileFolderReturnObject>;
    copyFolder<T extends boolean | undefined = undefined>(
        srcFolderPath: string,
        destFolderPath: string,
        duplicateFolderOption: DuplicateFolderOption,
        progressCallback?: (percent: number) => void,
        getSrcChecksum?: T,
        abortSignal?: AbortSignal
    ): Promise<T extends undefined ? string : FileFolderReturnObject>;
    moveFile<T extends boolean | undefined = undefined>(
        srcFilePath: string,
        destFilePath: string,
        duplicateFileOption: DuplicateFileOption,
        progressCallback?: (percent: number) => void,
        getSrcChecksum?: T,
        abortSignal?: AbortSignal
    ): Promise<T extends undefined ? string : FileFolderReturnObject>;
    moveFolder<T extends boolean | undefined = undefined>(
        srcFolderPath: string,
        destFolderPath: string,
        duplicateFolderOption: DuplicateFolderOption,
        progressCallback?: (percent: number) => void,
        getSrcChecksum?: T,
        abortSignal?: AbortSignal
    ): Promise<T extends undefined ? string : FileFolderReturnObject>;
    renameFile(filePath: string, newName: string, duplicateFileOption: DuplicateFileOption): Promise<string>;
    renameFolder(folderPath: string, newName: string, duplicateFolderOption: DuplicateFolderOption): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    deleteFolder(folderPath: string): Promise<void>;
    getFileMd5Hash(filePath: string, signal?: AbortSignal): Promise<string>;
    getFolderMd5Hash(folderPath: string, signal?: AbortSignal): Promise<string>;
}

export interface WaveAxiosHelper {
    makeRequest(config: Record<string, any>): Promise<any>;
    convertRequestToCurl(config: Record<string, any>): string;
    removeEmptyFields(obj: Record<string, any>): Record<string, any>;
}

// ─── Main Wave interface ──────────────────────────────────────────────────────

export default interface Wave {
    general: WaveGeneral;
    logger: WaveLogger;
    inputs: WaveInputs;
    outputs: WaveOutputs;
    fileAndFolderHelper: WaveFileAndFolderHelper;
    axiosHelper: WaveAxiosHelper;
}

// ─── Stream node errors ───────────────────────────────────────────────────────

export abstract class StreamNodeError extends Error {
    protected code!: number;
    protected detail!: string;

    getCode(): number {
        return this.code;
    }

    getDetail(): string {
        return this.detail;
    }

    getMessage(): string {
        return this.message;
    }

    toJson(): StreamNodeResultError {
        return {
            code: this.code,
            message: this.message,
            detail: this.detail,
            trace: this.stack,
        };
    }
}

export class StreamNodeGenericError extends StreamNodeError {
    constructor(err: Error, detail?: string) {
        super();
        this.detail = detail ?? "";
        this.code = 400;
        this.message = err.message;
    }
}

export class StreamNodeInputMissingError extends StreamNodeError {
    constructor(input: string) {
        super();
        this.code = 501;
        this.message = `Missing mandatory input parameter '${input}'`;
    }
}

export class StreamNodeInputTypeError extends StreamNodeError {
    constructor(input: string, want: string, got: string) {
        super();
        this.code = 502;
        this.message = `Invalid type for input parameter '${input}', want '${want}' got '${got}'`;
    }
}

export class StreamNodeNotFoundError extends StreamNodeError {
    constructor(detail: string) {
        super();
        this.detail = detail;
        this.code = 503;
        this.message = "Could not find node by uuid in node list";
    }
}

export class StreamNodePathNotFoundError extends StreamNodeError {
    constructor(error: Error, detail: string) {
        super();
        this.detail = detail;
        this.code = 504;
        this.message = "Could not find node by path: " + error.message;
    }
}

export class StreamWildcardReplacerError extends StreamNodeError {
    constructor(error: Error, detail: string) {
        super();
        this.detail = detail;
        this.code = 505;
        this.message = error.message;
    }
}

export class StreamNodePathTypeNotImplementedError extends StreamNodeError {
    constructor(error: Error, detail: string) {
        super();
        this.detail = detail;
        this.code = 506;
        this.message = error.message;
    }
}

export class StreamDesignNotFoundError extends StreamNodeError {
    constructor() {
        super();
        this.code = 404;
        this.message = "Unable to find design for stream";
    }
}

export class CatalogNotFoundError extends StreamNodeError {
    constructor() {
        super();
        this.code = 404;
    }

    setNode(streamNode: StreamNode): void {
        this.detail = streamNode.path;
        this.message = `Unable to find catalog of node ${streamNode.name}@${streamNode.catalog.version}`;
    }
}
