import Base from "../../Base";
import { Version } from "../../interfaces/global";
import BouncerFeatures from "./features";

export default class Bouncer extends Base {
    public get features(): BouncerFeatures {
        if (this._features === undefined) {
            this._features = new BouncerFeatures(this.options, this.axios);
        }
        return this._features;
    }
    private _features?: BouncerFeatures;

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/bouncer${endpoint}`;
    }
}
