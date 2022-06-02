import AxiosService from "./Axios";
import IDPService from "./service/IDP";

export interface Options {
    api: string;
}

export default abstract class Base {
    protected opts: Options;
    protected axios: AxiosService;

    constructor(opts: Options) {
        this.opts = opts;

        this.axios = new AxiosService();
    }
}
