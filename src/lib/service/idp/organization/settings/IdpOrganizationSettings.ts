import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../base";
import { IdpDomain } from "./domain/IdpDomain";
import { IdpOAuthApp } from "./oauth/IdpOAuthApp";

export default class IdpOrganizationSettings extends Base {
    /**
     * oAuthApp handles everything around open authorization applications
     */
    public oAuthApp: IdpOAuthApp;

    /**
     * domains handles everything around domains of organizations.
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
