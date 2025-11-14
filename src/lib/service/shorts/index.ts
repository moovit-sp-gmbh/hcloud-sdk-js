import Base, { MaybeRaw } from "../../Base";
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
    async version<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, Version>> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Version>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/shorts${endpoint}`;
    }
}
