import { AxiosInstance } from "axios";

export interface HcloudLogger {
    info(msg: string): void;
    debug(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
}

export interface Options {
    server: string;
    auditor?: {
        queue?: {
            executionInterval?: number;
        };
    };
    agent?: {
        server: string;
    };
    logger?: HcloudLogger;
}

export default abstract class Base {
    protected options: Options;
    protected axios: AxiosInstance;

    constructor(options: Options, axios: AxiosInstance) {
        this.options = options;
        this.axios = axios;
    }

    protected abstract getEndpoint(endpoint: string): string;

    protected get logger(): HcloudLogger | undefined {
        return this.options.logger;
    }
}