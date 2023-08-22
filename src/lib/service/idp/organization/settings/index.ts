import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../Base";
import { IdpDomain } from "./domain";
import { IdpOAuthApp } from "./oauth";

export default class IdpOrganizationSettings extends Base {
    /**
     * Handles everything around open authorization applications
     */
    public oAuthApp: IdpOAuthApp;

    /**
     * Handles everything around domains of organizations.
     */
    public domains: IdpDomain;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.domains = new IdpDomain(this.options, this.axios);
        this.oAuthApp = new IdpOAuthApp(this.options, this.axios);
    }

    protected getEndpoint(): string {
        throw new Error("Method not implemented.");
    }
}
