import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { IdpPat } from "./settings/IdpPats";
import { IdpTwoFactor } from "./settings/twoFactor/IdpTwoFactor";
import { IdpGeneral } from "./settings/IdpGeneral";

export class IdpSettings extends base {
    /**
     * pat handles everything around a user's pats (Personal Access Tokens)
     */
    public pat: IdpPat;

    /**
     * general settings are handling everything around a user's profile
     */
    public general: IdpGeneral;

    /**
     * twoFactor handles everything around a user's two factor authentication
     */
    public twoFactor: IdpTwoFactor;
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.pat = new IdpPat(options, axios);
        this.twoFactor = new IdpTwoFactor(options, axios);
        this.general = new IdpGeneral(options, axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
