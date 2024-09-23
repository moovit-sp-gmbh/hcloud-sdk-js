import Base from "../../Base";
import { AgentBundle } from "./bundle";
import { DevBundle } from "./bundle/dev";
import { AgentContext } from "./context";
import { AgentInstaller } from "./installer";

export default class Agent extends Base {
    public get context(): AgentContext {
        if (this._context === undefined) {
            this._context = new AgentContext(this.options, this.axios);
        }
        return this._context;
    }
    private _context?: AgentContext;
    public get bundle(): AgentBundle {
        if (this._bundle === undefined) {
            this._bundle = new AgentBundle(this.options, this.axios);
        }
        return this._bundle;
    }
    private _bundle?: AgentBundle;
    public get devBundle(): DevBundle {
        if (this._devBundle === undefined) {
            this._devBundle = new DevBundle(this.options, this.axios);
        }
        return this._devBundle;
    }
    private _devBundle?: DevBundle;
    public get installer(): AgentInstaller {
        if (this._installer === undefined) {
            this._installer = new AgentInstaller(this.options, this.axios);
        }
        return this._installer;
    }
    private _installer?: AgentInstaller;

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
