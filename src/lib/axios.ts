import axios, { AxiosPromise } from "axios";

export default class AxiosService {
    get = async (url: string): Promise<AxiosPromise> => {
        return axios.get(url);
    };

    post = async (url: string, body: any): Promise<AxiosPromise> => {
        return axios.post(url, body, {});
    };
}
