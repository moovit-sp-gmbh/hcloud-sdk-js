import { AxiosInstance } from "axios";
import { Options } from "../../../Base";
import { FuseSpaceInternal } from "./space";

export class FuseInternal {
    public space: FuseSpaceInternal;

    constructor(options: Options, axios: AxiosInstance) {
        this.space = new FuseSpaceInternal(options, axios);
    }
}
