import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { IdpPat } from "./settings/IdpPats";
import { IdpTwoFactor } from "./settings/IdpTwoFactor";

export class IdpSettings extends base {
    /**
     * pat handles everything around a user's pats (Personal Access Tokens)
     */
    public pat: IdpPat;

    /**
     * twoFactor handles everything around a user's two factor authentication
     */
    public twoFactor: IdpTwoFactor;
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.pat = new IdpPat(options, axios);
        this.twoFactor = new IdpTwoFactor(options, axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
