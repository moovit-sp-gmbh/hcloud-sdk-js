import Base, { MaybeRaw } from "../../Base";
import { Version } from "../../interfaces/global";
import AIHigh5 from "./high5";

export default class AIService extends Base {
    public get high5(): AIHigh5 {
        if (this._high5 === undefined) {
            this._high5 = new AIHigh5(this.options, this.axios);
        }
        return this._high5;
    }
    private _high5?: AIHigh5;

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, Version>> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Version>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/ai${endpoint}`;
    }
}
