import Base from "../../Base";
import { Version } from "../../interfaces/global";
import { ShortsInternal } from "./internal";

export default class Shorts extends Base {
    /**
     * Handles everything around internal endpoints
     */
    public get internal(): ShortsInternal {
        if (this._internal === undefined) {
            this._internal = new ShortsInternal(this.options, this.axios);
        }
        return this._internal;
    }
    private _internal?: ShortsInternal;

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/shorts${endpoint}`;
    }
}
