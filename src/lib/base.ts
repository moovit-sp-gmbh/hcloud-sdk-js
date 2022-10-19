import { Axios } from "axios";

export interface Options {
    api: string;
    auditor?: {
        queue?: {
            executionInterval?: number;
        };
    };
}

export default abstract class Base {
    protected opts: Options;
    protected axios: Axios;

    constructor(opts: Options, axios: Axios) {
        this.opts = opts;
        this.axios = axios;
    }

    protected abstract getEndpoint(endpoint: string): string;
}
