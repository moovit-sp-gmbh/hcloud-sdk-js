import Base from "../../../../../Base";
import { IdpTotp } from "./totp";

export class IdpTwoFactor extends Base {
    /**
     * Handles everything around a user's pats (Personal Access Tokens)
     */
    public get totp(): IdpTotp {
        if (this._totp === undefined) {
            this._totp = new IdpTotp(this.options, this.axios);
        }
        return this._totp;
    }
    private _totp?: IdpTotp;

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
