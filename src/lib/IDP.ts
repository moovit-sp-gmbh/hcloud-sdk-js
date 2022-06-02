import hcloud, { options } from './hcloud';

export default class IDPService extends hcloud {
  authenticate = async () => {
    // const resp = await this.axios.get('https://google.com');
    return this.opts.api;
  };
}
