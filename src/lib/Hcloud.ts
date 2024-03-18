import axios, { AxiosInstance } from "axios";
import { version } from "../package.json";
import { HcloudLogger, Options } from "./Base";
import AgentService from "./service/agent";
import AuditorService from "./service/auditor";
import BouncerService from "./service/bouncer";
import FuseService from "./service/fuse";
import DaliService from "./service/dali";
import High5Service from "./service/high5";
import IdpService from "./service/idp";
import MailerService from "./service/mailer";
import NatsService from "./service/nats";
import wrapError from "./helper/ErrorHelper";
import MothershipService from "./service/mothership";

// tslint:disable-next-line
export default class HCloud {
    public Agent: AgentService;
    public Auditor: AuditorService;
    public Bouncer: BouncerService;
    public High5: High5Service;
    public Idp: IdpService;
    public Fuse: FuseService;
    public Dali: DaliService;
    public Mailer: MailerService;
    public Mothership: MothershipService;
    public Nats: NatsService;
    private options: Options;
    private axios: AxiosInstance;

    constructor(options: Options) {
        this.options = options;
        this.axios = axios.create({
            transformRequest: axios.defaults.transformRequest,
            transformResponse: axios.defaults.transformResponse,
        });
        this.axios.defaults.headers.common["x-hcloud-user-agent"] = "hcloud-sdk-js/v" + version;
        this.axios.interceptors.response.use(
            response => response,
            error => {
                this.options.logger?.error(String(error), error);

                return Promise.reject(wrapError(error));
            }
        );

        this.Agent = new AgentService(this.options, this.axios);
        this.Auditor = new AuditorService(this.options, this.axios);
        this.Bouncer = new BouncerService(this.options, this.axios);
        this.High5 = new High5Service(this.options, this.axios);
        this.Idp = new IdpService(this.options, this.axios);
        this.Fuse = new FuseService(this.options, this.axios);
        this.Dali = new DaliService(this.options, this.axios);
        this.Mailer = new MailerService(this.options, this.axios);
        this.Mothership = new MothershipService(this.options, this.axios);
        this.Nats = new NatsService(this.options, this.axios);
    }

    /**
     * Sets the server url that the SDK shall do a request to.
     */
    setServer(server: string): HCloud {
        this.options.server = server;
        return this;
    }

    /**
     * Returns the currently set server url that the SDK will make requests to.
     */
    getServer(): string {
        return this.options.server;
    }

    /**
     * Authenticate against hcloud with username and password, as an alternative to using a bearer auth token.
     */
    setBasicAuth(username: string, password: string): HCloud {
        this.axios.defaults.headers.common["authorization"] = `Basic ${Buffer.from(username + ":" + password).toString("base64")}`;
        return this;
    }

    /**
     * Sets the auth token used for authentication against hcloud. The provided token must be a bearer token.
     */
    setAuthToken(token: string): HCloud {
        this.axios.defaults.headers.common["authorization"] = token;
        return this;
    }

    /**
     * Returns the currently set auth token.
     */
    getAuthToken(): string | undefined {
        return this.axios.defaults.headers.common["authorization"]?.toString();
    }

    /**
     * Sets the correlationID which will be sent to hcloud with each request and appears in all
     * logs that are made on behalf of this request, making it easier to debug the application.
     */
    setCorrelationId(correlationId: string): HCloud {
        this.axios.defaults.headers.common["X-Hcloud-Correlation-ID"] = correlationId;
        return this;
    }

    /**
     * Returns the currently set correlationID.
     */
    getCorrelationId(): string | undefined {
        return this.axios.defaults.headers.common["X-Hcloud-Correlation-ID"]?.toString();
    }

    /**
     * Returns the currently set logger.
     */
    getLogger(): HcloudLogger | undefined {
        return this.options.logger;
    }

    /**
     * Sets a logger used to receive logs from hcloud.
     */
    setLogger(logger: HcloudLogger) {
        this.options.logger = logger;
        return this;
    }

    /**
     * getAxios returns the active axios instance
     * Use it to add additional request/response interceptors
     * @returns {AxiosInstance} AxiosInstance
     */
    getAxios(): AxiosInstance {
        return this.axios;
    }

    /**
     * setAxios overwrites the existing axios instance
     * Use it to add a caching layer to axios
     * @returns {AxiosInstance} The new AxiosInstance
     */
    setAxios(axios: AxiosInstance): AxiosInstance {
        return (this.axios = axios);
    }
}
