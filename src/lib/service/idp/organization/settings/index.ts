import Base from "../../../../Base";
import { IdpDomain } from "./domain";
import { IdpOAuthApp } from "./oauth";

export default class IdpOrganizationSettings extends Base {
    /**
     * Handles everything around open authorization applications
     */
    public get oAuthApp(): IdpOAuthApp {
        if (this._oAuthApp === undefined) {
            this._oAuthApp = new IdpOAuthApp(this.options, this.axios);
        }
        return this._oAuthApp;
    }
    private _oAuthApp?: IdpOAuthApp;

    /**
     * Handles everything around domains of organizations.
     */
    public get domains(): IdpDomain {
        if (this._domains === undefined) {
            this._domains = new IdpDomain(this.options, this.axios);
        }
        return this._domains;
    }
    private _domains?: IdpDomain;

    protected getEndpoint(): string {
        throw new Error("Method not implemented.");
    }
}
