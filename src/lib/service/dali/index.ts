import Base from "../../Base";
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

    /**
     * @returns An object containing the endpoint version as a string
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
