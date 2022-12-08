import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { Version } from "../../interfaces/Global";
import { High5App } from "./High5App";
import { High5Event } from "./app/High5Event";
import { High5Stream } from "./app/event/High5Stream";
import { High5Design } from "./app/event/stream/High5Design";
import { High5Execute } from "./app/High5Execute";

export default class High5 extends base {
    public app: High5App;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.app = new High5App(this.options, this.axios);
    }

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
