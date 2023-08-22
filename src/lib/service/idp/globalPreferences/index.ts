import { AxiosInstance } from "axios";
import Base, { Options } from "../../../Base";
import { PublicConfig } from "../../../interfaces/PublicConfig";

export class IdpGlobalPreference extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves global preferances like reCaptcha ID and regions.
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
