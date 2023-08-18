import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { IdpPat } from "./pats";
import { IdpTwoFactor } from "./twoFactor";
import { IdpGeneral } from "./general";
import { IdpOAuthApps } from "./oauthApps";

export class IdpSettings extends Base {
    /**
     * pat handles everything around a user's pats (Personal Access Tokens)
     */
    public pat: IdpPat;

    /**
     * general settings are handling everything around a user's profile
     */
    public general: IdpGeneral;

    /**
     * OAuthApps manages user's OAuth applications
     */
    public oAuthApps: IdpOAuthApps;

    /**
     * twoFactor handles everything around a user's two factor authentication
     */
    public twoFactor: IdpTwoFactor;
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.pat = new IdpPat(options, axios);
        this.twoFactor = new IdpTwoFactor(options, axios);
        this.general = new IdpGeneral(options, axios);
        this.oAuthApps = new IdpOAuthApps(options, axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
