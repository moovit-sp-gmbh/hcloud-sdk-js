import base, { Options } from "../../base";
import { Axios } from "axios";
import { Version } from "../../interfaces/Global";
import { High5App } from "./High5App";
import { High5Event } from "./High5Event";
import { High5Stream } from "./High5Stream";
import { High5Design } from "./High5Design";
import { High5Node } from "./High5Node";

export default class High5 extends base {
    public app: High5App;
    public event: High5Event;
    public stream: High5Stream;
    public design: High5Design;
    public node: High5Node;

    constructor(opts: Options, axios: Axios) {
        super(opts, axios);

        this.app = new High5App(opts, axios);
        this.event = new High5Event(opts, axios);
        this.stream = new High5Stream(opts, axios);
        this.design = new High5Design(opts, axios);
        this.node = new High5Node(opts, axios);
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
        return `${this.opts.api}/api/high5${endpoint}`;
    }
}
