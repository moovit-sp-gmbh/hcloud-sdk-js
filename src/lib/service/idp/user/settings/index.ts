import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { IdpPat } from "./pats";
import { IdpTwoFactor } from "./twoFactor";
import { IdpGeneral } from "./general";
import { IdpOAuthApps } from "./oauthApps";
import { IdpNotifications } from "./notifications";

export class IdpSettings extends Base {
    /**
     * Handles everything around a user's pats (Personal Access Tokens)
     */
    public pat: IdpPat;

    /**
     * Handles everything around general user settings
     */
    public general: IdpGeneral;

    /**
     * Handles everything around notification settings of user
     */
    public notifications: IdpNotifications;

    /**
     * Manages user's OAuth applications
     */
    public oAuthApps: IdpOAuthApps;

    /**
     * Handles everything around a user's two factor authentication
     */
    public twoFactor: IdpTwoFactor;
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.pat = new IdpPat(options, axios);
        this.twoFactor = new IdpTwoFactor(options, axios);
        this.general = new IdpGeneral(options, axios);
        this.notifications = new IdpNotifications(options, axios);
        this.oAuthApps = new IdpOAuthApps(options, axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
