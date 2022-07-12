import base, { Options } from "./base";
import IDPService from "./service/IDP";
import AuditorService from "./service/Auditor";
import High5Service from "./service/High5";
import axios from "axios";
import { version } from "../package.json";

// tslint:disable-next-line
export default class hcloud extends base {
    public Auditor: AuditorService;
    public High5: High5Service;
    public IDP: IDPService;

    constructor(opts: Options) {
        super(opts);

        this.Auditor = new AuditorService(this.opts);
        this.High5 = new High5Service(this.opts);
        this.IDP = new IDPService(this.opts);

        axios.defaults.headers.common = {
            "User-Agent": "hcloud-sdk-js/v" + version,
        };
    }

    setAuthToken(token: string): hcloud {
        axios.defaults.headers.common = Object.assign(axios.defaults.headers.common, {
            Authorization: token,
        });
        return this;
    }
}
