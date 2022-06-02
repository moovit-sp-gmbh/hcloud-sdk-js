import IDPService from './IDP';
import AxiosService from './Axios';

// tslint:disable-next-line
export interface options {
  api: string;
}

// tslint:disable-next-line
export default class hcloud {
  protected opts: options;
  protected axios: AxiosService;
  public IDP: IDPService;

  constructor(opts: options) {
    this.opts = opts;

    this.axios = new AxiosService();

    this.IDP = new IDPService(this.opts);
  }
}
