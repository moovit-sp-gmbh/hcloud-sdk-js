import base, { Options } from "./base";
import IDPService from "./service/idp/IDP";
import AuditorService from "./service/auditor/Auditor";
import High5Service from "./service/high5/High5";
import MailerService from "./service/mailer/Mailer";
import axios from "axios";
import { version } from "../package.json";

// tslint:disable-next-line
export default class hcloud {
    public Auditor: AuditorService;
    public High5: High5Service;
    public IDP: IDPService;
    public Mailer: MailerService;

    constructor(opts: Options) {
        this.Auditor = new AuditorService(opts);
        this.High5 = new High5Service(opts);
        this.IDP = new IDPService(opts);
        this.Mailer = new MailerService(opts);
    }

    setAuthToken(token: string): hcloud {
        axios.defaults.headers.common = Object.assign(axios.defaults.headers.common, {
            Authorization: token,
        });
        return this;
    }

    getAuthToken(): string {
        return axios.defaults.headers.common.Authorization.toString();
    }

    overrideActiveOrganization(activeOrganizationId: string): hcloud {
        axios.defaults.headers.common = Object.assign(axios.defaults.headers.common, {
            "active-organization-id": activeOrganizationId,
        });
        return this;
    }

    resetActiveOrganization(): void {
        delete axios.defaults.headers.common["active-organization-id"];
    }
}
