import base, { Options } from "./base";
import IDPService from "./service/IDP";
import High5Service from "./service/High5";

// tslint:disable-next-line
export default class hcloud extends base {
    public IDP: IDPService;
    public High5: High5Service;

    constructor(opts: Options) {
        super(opts);

        this.IDP = new IDPService(this.opts);
        this.High5 = new High5Service(this.opts);
    }
}
