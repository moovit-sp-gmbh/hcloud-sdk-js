import axios, { AxiosInstance } from "axios";
import { version } from "../package.json";
import { HcloudLogger, Options } from "./Base";
import wrapError from "./helper/ErrorHelper";
import { disableCacheHeaders } from "./interfaces/axios";
import AgentService from "./service/agent";
import AuditorService from "./service/auditor";
import BouncerService from "./service/bouncer";
import DaliService from "./service/dali";
import FuseService from "./service/fuse";
import High5Service from "./service/high5";
import IdpService from "./service/idp";
import MailerService from "./service/mailer";
import MothershipService from "./service/mothership";
import NatsService from "./service/nats";

// tslint:disable-next-line
export class HCloud {
    public get Agent(): AgentService {
        if (this._Agent === undefined) {
            this._Agent = new AgentService(this.options, this.axios);
        }
        return this._Agent;
    }
    private _Agent?: AgentService;

    public get Auditor(): AuditorService {
        if (this._Auditor === undefined) {
            this._Auditor = new AuditorService(this.options, this.axios);
        }
        return this._Auditor;
    }
    private _Auditor?: AuditorService;

    public get Bouncer(): BouncerService {
        if (this._Bouncer === undefined) {
            this._Bouncer = new BouncerService(this.options, this.axios);
        }
        return this._Bouncer;
    }
    private _Bouncer?: BouncerService;

    public get High5(): High5Service {
        if (this._High5 === undefined) {
            this._High5 = new High5Service(this.options, this.axios);
        }
        return this._High5;
    }
    private _High5?: High5Service;

    public get Idp(): IdpService {
        if (this._Idp === undefined) {
            this._Idp = new IdpService(this.options, this.axios);
        }
        return this._Idp;
    }
    private _Idp?: IdpService;

    public get Fuse(): FuseService {
        if (this._Fuse === undefined) {
            this._Fuse = new FuseService(this.options, this.axios);
        }
        return this._Fuse;
    }
    private _Fuse?: FuseService;

    public get Dali(): DaliService {
        if (this._Dali === undefined) {
            this._Dali = new DaliService(this.options, this.axios);
        }
        return this._Dali;
    }
    private _Dali?: DaliService;

    public get Mailer(): MailerService {
        if (this._Mailer === undefined) {
            this._Mailer = new MailerService(this.options, this.axios);
        }
        return this._Mailer;
    }
    private _Mailer?: MailerService;

    public get Mothership(): MothershipService {
        if (this._Mothership === undefined) {
            this._Mothership = new MothershipService(this.options, this.axios);
        }
        return this._Mothership;
    }
    private _Mothership?: MothershipService;

    public get Nats(): NatsService {
        if (this._Nats === undefined) {
            this._Nats = new NatsService(this.options, this.axios);
        }
        return this._Nats;
    }
    private _Nats?: NatsService;
    private options: Options;
    private axios: AxiosInstance;

    constructor(options: Options) {
        this.options = options;
        this.axios = axios.create({
            transformRequest: axios.defaults.transformRequest,
            transformResponse: axios.defaults.transformResponse,
        });
        // we set a custom header here as chrome does not allow to set the 'user-agent' header
        this.axios.defaults.headers.common["x-hcloud-user-agent"] = "hcloud-sdk-js/v" + version;
        if (typeof window === "undefined") {
            // also set 'user-agent' header in non-browser environments
            this.axios.defaults.headers.common["user-agent"] = "hcloud-sdk-js/v" + version;
        }

        this.axios.interceptors.response.use(
            response => response,
            error => {
                this.options.logger?.error(String(error), error);

                return Promise.reject(wrapError(error));
            }
        );
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
     * Send various no-cache headers globally with every request
     */
    disableCachingGlobally(): HCloud {
        this.axios.defaults.headers.common = {
            ...this.axios.defaults.headers.common,
            ...disableCacheHeaders,
        };
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
