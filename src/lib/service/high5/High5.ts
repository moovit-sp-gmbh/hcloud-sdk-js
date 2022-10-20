import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
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

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.app = new High5App(this.options, this.axios);
        this.event = new High5Event(this.options, this.axios);
        this.stream = new High5Stream(this.options, this.axios);
        this.design = new High5Design(this.options, this.axios);
        this.node = new High5Node(this.options, this.axios);
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
