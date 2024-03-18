import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { AgentBundle } from "./bundle";
import { AgentContext } from "./context";
import { AgentInstaller } from "./installer";

export default class Agent extends Base {
    public context: AgentContext;
    public bundle: AgentBundle;
    public installer: AgentInstaller;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
        this.context = new AgentContext(this.options, this.axios);
        this.bundle = new AgentBundle(this.options, this.axios);
        this.installer = new AgentInstaller(this.options, this.axios);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
