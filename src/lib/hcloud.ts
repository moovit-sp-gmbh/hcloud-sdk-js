import axios, { AxiosInstance } from "axios";
import { version } from "../package.json";
import { Options } from "./base";
import AgentService from "./service/agent";
import AuditorService from "./service/auditor";
import FuseService from "./service/fuse";
import DaliService from "./service/dali";
import High5Service from "./service/high5";
import IDPService from "./service/idp";
import MailerService from "./service/mailer";
import NatsService from "./service/nats";

// tslint:disable-next-line
export default class hcloud {
    public Agent: AgentService;
    public Auditor: AuditorService;
    public High5: High5Service;
    public IDP: IDPService;
    public Fuse: FuseService;
    public Dali: DaliService;
    public Mailer: MailerService;
    public Nats: NatsService;
    private options: Options;
    private axios: AxiosInstance;

    constructor(options: Options) {
        this.options = options;
        this.axios = axios.create({
            transformRequest: axios.defaults.transformRequest,
            transformResponse: axios.defaults.transformResponse,
        });
        this.axios.defaults.headers.common["user-agent"] = "hcloud-sdk-js/v" + version;

        this.Agent = new AgentService(this.options, this.axios);
        this.Auditor = new AuditorService(this.options, this.axios);
        this.High5 = new High5Service(this.options, this.axios);
        this.IDP = new IDPService(this.options, this.axios);
        this.Fuse = new FuseService(this.options, this.axios);
        this.Dali = new DaliService(this.options, this.axios);
        this.Mailer = new MailerService(this.options, this.axios);
        this.Nats = new NatsService();
    }

    setServer(server: string): hcloud {
        this.options.server = server;
        return this;
    }

    getServer(): string {
        return this.options.server;
    }

    setBasicAuth(username: string, password: string): hcloud {
        this.axios.defaults.headers.common["authorization"] = `Basic ${Buffer.from(username + ":" + password).toString("base64")}`;
        return this;
    }

    setAuthToken(token: string): hcloud {
        this.axios.defaults.headers.common["authorization"] = token;
        return this;
    }

    getAuthToken(): string | undefined {
        return this.axios.defaults.headers.common["authorization"]?.toString();
    }

    setCorrelationId(correlationId: string): hcloud {
        this.axios.defaults.headers.common["X-Hcloud-Correlation-ID"] = correlationId;
        return this;
    }

    getCorrelationId(): string | undefined {
        return this.axios.defaults.headers.common["X-Hcloud-Correlation-ID"]?.toString();
    }

    getNatsService(): NatsService {
        return this.Nats;
    }
}
