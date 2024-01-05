import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { S3 } from "./s3";

export class High5Wave extends Base {
    public s3: S3;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.s3 = new S3(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
