import base, { Options } from "./base";
import IDPService from "./service/IDP";
import High5Service from "./service/High5";
import axios from "axios";
import { version } from "../../package.json";

// tslint:disable-next-line
export default class hcloud extends base {
    public IDP: IDPService;
    public High5: High5Service;

    constructor(opts: Options) {
        super(opts);

        this.IDP = new IDPService(this.opts);
        this.High5 = new High5Service(this.opts);

        axios.defaults.headers.common = {
            "User-Agent": "hcloud-sdk-js/v" + version,
        };
    }

    setAuthToken(token: string) {
        axios.defaults.headers.common = Object.assign(axios.defaults.headers.common, {
            Authorization: token,
        });
    }
}
