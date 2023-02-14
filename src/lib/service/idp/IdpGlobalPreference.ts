import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { PublicConfig } from "../../interfaces/IDP";

export class IdpGlobalPreference extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * getGlobalPreference
     * It returns the reCaptcha ID and regions
     * @returns object containing reCaptcha ID and regions
     */
    public getGlobalPreference = async (): Promise<PublicConfig> => {
        const response = await this.axios.get<PublicConfig>(this.getEndpoint(`/v1/config`)).catch((err: Error) => {
            throw err;
        });
        return response.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
