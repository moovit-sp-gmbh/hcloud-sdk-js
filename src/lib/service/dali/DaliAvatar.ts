import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { DaliUser } from "./avatar/DaliUser";
import { DaliTeam } from "./avatar/DaliTeam";
import { DaliOrganization } from "./avatar/DaliOrganization";

export class DaliAvatar extends base {
    /**
     * user handles everything around user avatars
     */
    public user: DaliUser;

    /**
     * team handles everything around team avatars
     */
    public team: DaliTeam;

    /**
     * organization handles everything around organization avatars
     */
    public organization: DaliOrganization;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.user = new DaliUser(this.options, this.axios);
        this.team = new DaliTeam(this.options, this.axios);
        this.organization = new DaliOrganization(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
