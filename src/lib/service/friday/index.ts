import Base from "../../Base";
import { Version } from "../../interfaces/global";
import { FridaySpace } from "./space";

export default class Friday extends Base {
    public get space(): FridaySpace {
        if (this._space === undefined) {
            this._space = new FridaySpace(this.options, this.axios);
        }
        return this._space;
    }
    private _space?: FridaySpace;

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/friday${endpoint}`;
    }
}
