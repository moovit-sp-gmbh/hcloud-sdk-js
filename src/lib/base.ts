import { AxiosInstance } from "axios";

export interface Options {
    server: string;
    auditor?: {
        queue?: {
            executionInterval?: number;
        };
    };
}

export default abstract class Base {
    protected options: Options;
    protected axios: AxiosInstance;

    constructor(options: Options, axios: AxiosInstance) {
        this.options = options;
        this.axios = axios;
    }

    protected abstract getEndpoint(endpoint: string): string;
}
