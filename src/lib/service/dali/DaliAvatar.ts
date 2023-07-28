import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { DaliOrganization } from "./avatar/DaliOrganization";

export class DaliAvatar extends base {
    /**
     * organization handles everything around organization avatars
     */
    public organization: DaliOrganization;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.organization = new DaliOrganization(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
