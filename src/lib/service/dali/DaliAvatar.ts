import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { DaliUser } from "./avatar/DaliUser";
import { DaliTeam } from "./avatar/DaliTeam";
import { DaliOrganization } from "./avatar/DaliOrganization";
import { DaliHigh5 } from "./avatar/DaliHigh5";
import { DaliFuse } from "./avatar/DaliFuse";
import { DaliOAuthApp } from "./avatar/DaliOAuthApp";

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

    /**
     * high5 handles everything around high5 spaces avatars
     */
    public high5: DaliHigh5;

    /**
     * fuse handles everything around fuse spaces avatars
     */
    public fuse: DaliFuse;

    /**
     * oauth handles everything around OAuth applications avatars
     */
    public oauth: DaliOAuthApp;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.user = new DaliUser(this.options, this.axios);
        this.team = new DaliTeam(this.options, this.axios);
        this.organization = new DaliOrganization(this.options, this.axios);
        this.high5 = new DaliHigh5(this.options, this.axios);
        this.fuse = new DaliFuse(this.options, this.axios);
        this.oauth = new DaliOAuthApp(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
