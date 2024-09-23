import Base from "../../Base";
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
    public get user(): DaliUser {
        if (this._user === undefined) {
            this._user = new DaliUser(this.options, this.axios);
        }
        return this._user;
    }
    private _user?: DaliUser;

    /**
     * Handles everything around team avatars
     */
    public get team(): DaliTeam {
        if (this._team === undefined) {
            this._team = new DaliTeam(this.options, this.axios);
        }
        return this._team;
    }
    private _team?: DaliTeam;

    /**
     * Handles everything around organization avatars
     */
    public get organization(): DaliOrganization {
        if (this._organization === undefined) {
            this._organization = new DaliOrganization(this.options, this.axios);
        }
        return this._organization;
    }
    private _organization?: DaliOrganization;

    /**
     * Handles everything around high5 spaces avatars
     */
    public get high5Space(): DaliHigh5 {
        if (this._high5Space === undefined) {
            this._high5Space = new DaliHigh5(this.options, this.axios);
        }
        return this._high5Space;
    }
    private _high5Space?: DaliHigh5;

    /**
     * Handles everything around fuse spaces avatars
     */
    public get fuseSpace(): DaliFuse {
        if (this._fuseSpace === undefined) {
            this._fuseSpace = new DaliFuse(this.options, this.axios);
        }
        return this._fuseSpace;
    }
    private _fuseSpace?: DaliFuse;

    /**
     * Handles everything around OAuth applications avatars
     */
    public get oauth(): DaliOAuthApp {
        if (this._oauth === undefined) {
            this._oauth = new DaliOAuthApp(this.options, this.axios);
        }
        return this._oauth;
    }
    private _oauth?: DaliOAuthApp;

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}
