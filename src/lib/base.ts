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

    constructor(opts: Options) {
        this.opts = opts;
    }

    protected abstract getEndpoint(endoiint: string): string;
}
