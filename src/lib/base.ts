import IDPService from "./service/IDP";

export interface Options {
    api: string;
}

export default abstract class Base {
    protected opts: Options;

    constructor(opts: Options) {
        this.opts = opts;
    }
}
