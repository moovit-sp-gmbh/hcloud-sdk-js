import { AxiosInstance } from "axios";
import { Options } from "../../base";
import { FuseAppInternal } from "./FuseAppInternal";

export class FuseInternal {
    public app: FuseAppInternal;

    constructor(options: Options, axios: AxiosInstance) {
        this.app = new FuseAppInternal(options, axios);
    }
}
