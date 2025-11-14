import Base, { MaybeRaw } from "../../Base";
import { Version } from "../../interfaces/global";
import { DaliAvatar } from "./DaliAvatar";

export default class Dali extends Base {
    /**
     * Handles everything around avatars
     */
    public get avatar(): DaliAvatar {
        if (this._avatar === undefined) {
            this._avatar = new DaliAvatar(this.options, this.axios);
        }
        return this._avatar;
    }
    private _avatar?: DaliAvatar;

    async version<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, Version>> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Version>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
