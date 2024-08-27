import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { IdpTotp } from "./totp";

export class IdpTwoFactor extends Base {
    /**
     * Handles everything around a user's pats (Personal Access Tokens)
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
