import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { DaliUser } from "./avatar/DaliUser";
import { DaliTeam } from "./avatar/DaliTeam";
import { DaliOrganization } from "./avatar/DaliOrganization";
import { DaliHigh5 } from "./avatar/DaliHigh5Space";
import { DaliFuse } from "./avatar/DaliFuseSpace";
import { DaliOAuthApp } from "./avatar/DaliOAuthApp";

export class DaliAvatar extends Base {
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
     * high5Space handles everything around high5 spaces avatars
     */
    public high5Space: DaliHigh5;

    /**
     * fuseSpace handles everything around fuse spaces avatars
     */
    public fuseSpace: DaliFuse;

    /**
     * oauth handles everything around OAuth applications avatars
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
