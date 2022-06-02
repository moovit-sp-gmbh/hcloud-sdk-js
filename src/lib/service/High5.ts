import base, { Options } from "../base";
import { AxiosResponse } from "axios";

export default class High5 extends base {
    private getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/high5${endpoint}`;
    }
}
