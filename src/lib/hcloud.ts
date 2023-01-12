import base, { Options } from "./base";
import IDPService from "./service/idp";
import AuditorService from "./service/auditor";
import High5Service from "./service/high5";
import MailerService from "./service/mailer";
import NatsService from "./service/nats";
import axios, { AxiosInstance } from "axios";
import { version } from "../package.json";
import Base from "./base";

// tslint:disable-next-line
export default class hcloud {
    public Auditor: AuditorService;
    public High5: High5Service;
    public IDP: IDPService;
    public Mailer: MailerService;
    public Nats: NatsService;
    private options: Options;
    private axios: AxiosInstance;

    constructor(options: Options) {
        this.options = options;
        this.axios = axios.create();
        this.axios.defaults.headers.common["user-agent"] = "hcloud-sdk-js/v" + version;

        this.Auditor = new AuditorService(this.options, this.axios);
        this.High5 = new High5Service(this.options, this.axios);
        this.IDP = new IDPService(this.options, this.axios);
        this.Mailer = new MailerService(this.options, this.axios);
        this.Nats = NatsService.getInstance();
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

    setActiveOrganizationId(organizationId: string): hcloud {
        this.axios.defaults.headers.common["x-active-organization-id"] = organizationId;
        return this;
    }

    getActiveOrganizationId(): string | undefined {
        return this.axios.defaults.headers.common["x-active-organization-id"]?.toString();
    }
}
