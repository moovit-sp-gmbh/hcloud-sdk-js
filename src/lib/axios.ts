import axios, { AxiosPromise } from 'axios';

export default class AxiosService {
  get = async (url: string): Promise<AxiosPromise> => {
    return axios.get(url);
  };
}
