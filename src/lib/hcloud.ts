import { Options } from "./base";
import IDPService from "./service/idp/IDP";
import AuditorService from "./service/auditor/Auditor";
import High5Service from "./service/high5/High5";
import MailerService from "./service/mailer/Mailer";
import { Axios, AxiosRequestConfig } from "axios";

// tslint:disable-next-line
export default class hcloud {
    public Auditor: AuditorService;
    public High5: High5Service;
    public IDP: IDPService;
    public Mailer: MailerService;

    private options: Options;
    private axios: Axios;

    constructor(opts: Options) {
        this.options = opts;
        this.axios = new Axios();

        this.Auditor = new AuditorService(this.options, this.axios);
        this.High5 = new High5Service(this.options, this.axios);
        this.IDP = new IDPService(this.options, this.axios);
        this.Mailer = new MailerService(this.options, this.axios);
    }

    setAuthToken(token: string): hcloud {
        this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
            if (config.headers) {
                config.headers.authorization = token;
            }
            return config;
        });
        return this;
    }

    setEndpoint(endpoint: string): hcloud {
        this.options.api = endpoint;
        return this;
    }

    overrideActiveOrganization(activeOrganizationId: string): hcloud {
        this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
            if (config.headers) {
                config.headers["active-organization-id"] = activeOrganizationId;
            }
            return config;
        });
        return this;
    }
}
