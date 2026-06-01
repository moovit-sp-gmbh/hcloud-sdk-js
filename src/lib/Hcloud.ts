import axios, { AxiosInstance } from "axios";
import { version } from "../package.json";
import { HcloudLogger, Options } from "./Base";
import wrapError from "./helper/ErrorHelper";
import { disableCacheHeaders, RefreshToken } from "./interfaces/axios";
import { GrantType, OAuthToken, OAuthTokenRequest } from "./interfaces/idp";
import AgentService from "./service/agent";
import AuditorService from "./service/auditor";
import BouncerService from "./service/bouncer";
import CosmoService from "./service/cosmo";
import DaliService from "./service/dali";
import High5Service from "./service/high5";
import IdpService from "./service/idp";
import PanelService from "./service/panel";
import MailerService from "./service/mailer";
import MothershipService from "./service/mothership";
import NatsService from "./service/nats";
import ShortsService from "./service/shorts";

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

    public get Cosmo(): CosmoService {
        if (this._Cosmo === undefined) {
            this._Cosmo = new CosmoService(this.options, this.axios);
        }
        return this._Cosmo;
    }
    private _Cosmo?: CosmoService;

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

    public get Panels(): PanelService {
        if (this._Panels === undefined) {
            this._Panels = new PanelService(this.options, this.axios);
        }
        return this._Panels;
    }
    private _Panels?: PanelService;

    public get Mothership(): MothershipService {
        if (this._Mothership === undefined) {
            this._Mothership = new MothershipService(this.options, this.axios);
        }
        return this._Mothership;
    }
    private _Mothership?: MothershipService;

    public get Shorts(): ShortsService {
        if (this._Shorts === undefined) {
            this._Shorts = new ShortsService(this.options, this.axios);
        }
        return this._Shorts;
    }
    private _Shorts?: ShortsService;

    public get Nats(): NatsService {
        if (this._Nats === undefined) {
            this._Nats = new NatsService(this.options, this.axios);
        }
        return this._Nats;
    }
    private _Nats?: NatsService;
    private options: Options;
    private axios: AxiosInstance;

    private refreshToken: RefreshToken | null = null;
    private refreshPromise: Promise<OAuthToken> | null = null;

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
        } else {
            // eslint-disable-next-line
            this.axios.defaults.headers.common["x-hcloud-origin"] = `${window?.location.protocol}//${window?.location.host}`;
        }

        this.axios.interceptors.response.use(
            response => response,
            error => {
                this.options.logger?.error(String(error), error);

                return Promise.reject(wrapError(error));
            }
        );

        // add request interceptor to handle auto token refresh if set
        this.axios.interceptors.request.use(async config => {
            if (!this.refreshToken) return config;

            const isExpired = Date.now() >= this.refreshToken.expiresAt - 120 * 1000; // consider token expired if it will expire in the next 120 seconds

            if (isExpired) {
                await this.refreshAccessToken();
            } else if (this.refreshPromise) {
                await this.refreshPromise;
            }

            return config;
        });

        // trigger refresh logic in case of 401 has been received and a refresh token is set
        this.axios.interceptors.response.use(
            res => res,
            async error => {
                const originalRequest = error.config;

                if (this.refreshToken) {
                    if (error.response?.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;

                        const newToken = await this.refreshAccessToken();
                        if (newToken) {
                            originalRequest.headers.Authorization = `Bearer ${newToken.access_token}`;
                        }

                        return this.axios(originalRequest);
                    }
                }

                return Promise.reject(error);
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
     * Sets the refresh token and enables auto-fresh
     */
    setRefreshToken(refreshToken: RefreshToken): HCloud {
        this.refreshToken = refreshToken;
        return this;
    }

    /**
     * Returns the currently set refresh token.
     */
    getRefreshToken(): RefreshToken | null {
        return this.refreshToken;
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

    /**
     * refreshAccessToken will refresh the access_token using a given refresh_token and set the new access_token and refresh_token in the SDK.
     * If multiple requests trigger a token refresh at the same time, only one request will actually call the token endpoint, while the others will wait for the result of that request and use the same new token.
     *
     * This method will trigger a callback? to enable the returned values to be persisted
     */
    private async refreshAccessToken(): Promise<OAuthToken | null> {
        if (!this.refreshToken) throw new Error("no refresh token set");

        if (!this.refreshPromise) {
            this.refreshPromise = this.Idp.oAuth
                .exchangeCodeForToken({
                    // eslint-disable-next-line camelcase
                    grant_type: GrantType.REFRESH_TOKEN,
                    // eslint-disable-next-line camelcase
                    refresh_token: this.refreshToken.token,
                } as OAuthTokenRequest)
                .then(res => {
                    this.refreshPromise = null;

                    if (res.access_token) {
                        this.setAuthToken(`Bearer ${res.access_token}`);
                        const newRefreshToken = {
                            token: res.refresh_token!,
                            expiresAt: Date.now() + (res.expires_in ?? 0) * 1000,
                            callback: this.refreshToken?.callback,
                        } as RefreshToken;
                        this.setRefreshToken(newRefreshToken);
                        this.refreshToken?.callback?.(res.access_token, newRefreshToken); // call callback to hydrate localStorage with the new refresh token for example
                    }
                    return res;
                })
                .catch(err => {
                    this.refreshPromise = null;
                    this.refreshToken = null;
                    throw err;
                });
        }

        return this.refreshPromise;
    }
}
