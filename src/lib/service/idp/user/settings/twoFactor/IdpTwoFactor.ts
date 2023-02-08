import { AxiosInstance } from "axios";
import base, { Options } from "../../../../../base";
import { IdpTotp } from "./IdpTotp";

export class IdpTwoFactor extends base {
    /**
     * pat handles everything around a user's pats (Personal Access Tokens)
     */
    public totp: IdpTotp;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.totp = new IdpTotp(options, axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
