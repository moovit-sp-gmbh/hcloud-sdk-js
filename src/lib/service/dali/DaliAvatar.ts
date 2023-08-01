import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { DaliOrganization } from "./avatar/DaliOrganization";
import { DaliUser } from "./avatar/DaliUser";

export class DaliAvatar extends base {
    /**
     * user handles everything around user avatars
     */
    public user: DaliUser;

    /**
     * organization handles everything around organization avatars
     */
    public organization: DaliOrganization;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.user = new DaliUser(this.options, this.axios);
        this.organization = new DaliOrganization(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
