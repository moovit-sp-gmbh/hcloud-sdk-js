import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { DaliFuse } from "./avatar/DaliFuseSpace";
import { DaliHigh5 } from "./avatar/DaliHigh5Space";
import { DaliOAuthApp } from "./avatar/DaliOAuthApp";
import { DaliOrganization } from "./avatar/DaliOrganization";
import { DaliTeam } from "./avatar/DaliTeam";
import { DaliUser } from "./avatar/DaliUser";

export class DaliAvatar extends Base {
    /**
     * Handles everything around user avatars
     */
    public user: DaliUser;

    /**
     * Handles everything around team avatars
     */
    public team: DaliTeam;

    /**
     * Handles everything around organization avatars
     */
    public organization: DaliOrganization;

    /**
     * Handles everything around high5 spaces avatars
     */
    public high5Space: DaliHigh5;

    /**
     * Handles everything around fuse spaces avatars
     */
    public fuseSpace: DaliFuse;

    /**
     * Handles everything around OAuth applications avatars
     */
    public oauth: DaliOAuthApp;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.user = new DaliUser(this.options, this.axios);
        this.team = new DaliTeam(this.options, this.axios);
        this.organization = new DaliOrganization(this.options, this.axios);
        this.high5Space = new DaliHigh5(this.options, this.axios);
        this.fuseSpace = new DaliFuse(this.options, this.axios);
        this.oauth = new DaliOAuthApp(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
