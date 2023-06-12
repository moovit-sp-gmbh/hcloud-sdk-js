import { AxiosInstance } from "axios";
import { Options } from "../../base";
import { FuseSpaceInternal } from "./FuseSpaceInternal";

export class FuseInternal {
    public space: FuseSpaceInternal;

    constructor(options: Options, axios: AxiosInstance) {
        this.space = new FuseSpaceInternal(options, axios);
    }
}
