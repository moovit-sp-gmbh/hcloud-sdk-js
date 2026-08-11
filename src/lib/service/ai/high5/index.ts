import Base from "../../../Base";
import { AIHigh5Stream } from "./stream";

export default class AIHigh5 extends Base {
    public get stream(): AIHigh5Stream {
        if (this._stream === undefined) {
            this._stream = new AIHigh5Stream(this.options, this.axios);
        }
        return this._stream;
    }
    private _stream?: AIHigh5Stream;

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/ai${endpoint}`;
    }
}
