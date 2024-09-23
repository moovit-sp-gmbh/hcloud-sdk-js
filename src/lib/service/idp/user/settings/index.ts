import Base from "../../../../Base";
import { IdpConnections } from "./connections";
import { IdpGeneral } from "./general";
import { IdpNotifications } from "./notifications";
import { IdpOAuthApps } from "./oauthApps";
import { IdpPat } from "./pats";
import { IdpTwoFactor } from "./twoFactor";

export class IdpSettings extends Base {
    /**
     * Handles everything around a user's pats (Personal Access Tokens)
     */
    public get pat(): IdpPat {
        if (this._pat === undefined) {
            this._pat = new IdpPat(this.options, this.axios);
        }
        return this._pat;
    }
    private _pat?: IdpPat;

    /**
     * Handles everything around general user settings
     */
    public get general(): IdpGeneral {
        if (this._general === undefined) {
            this._general = new IdpGeneral(this.options, this.axios);
        }
        return this._general;
    }
    private _general?: IdpGeneral;

    /**
     * Handles everything around notification settings of user
     */
    public get notifications(): IdpNotifications {
        if (this._notifications === undefined) {
            this._notifications = new IdpNotifications(this.options, this.axios);
        }
        return this._notifications;
    }
    private _notifications?: IdpNotifications;

    /**
     * Manages user's OAuth applications
     */
    public get oAuthApps(): IdpOAuthApps {
        if (this._oAuthApps === undefined) {
            this._oAuthApps = new IdpOAuthApps(this.options, this.axios);
        }
        return this._oAuthApps;
    }
    private _oAuthApps?: IdpOAuthApps;

    /**
     * Handles everything around a user's two factor authentication
     */
    public get twoFactor(): IdpTwoFactor {
        if (this._twoFactor === undefined) {
            this._twoFactor = new IdpTwoFactor(this.options, this.axios);
        }
        return this._twoFactor;
    }
    private _twoFactor?: IdpTwoFactor;

    /**
     * Handles everything around a user's two factor authentication
     */
    public get connections(): IdpConnections {
        if (this._connections === undefined) {
            this._connections = new IdpConnections(this.options, this.axios);
        }
        return this._connections;
    }
    private _connections?: IdpConnections;

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
