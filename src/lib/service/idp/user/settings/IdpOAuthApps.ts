import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../base";
import { OAuthApp } from "../../../../interfaces/IDP";

export class OAuthApps extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    public getAllOAuthApps = async (limit?: number, page?: number): Promise<OAuthApp[]> => {
        limit = limit || 25;
        page = page || 0;

        const response = await this.axios.get(this.getEndpoint(`/v1/user/settings/oauth/list?limit=${limit}&page=${page}`)).catch((err: Error) => {
            throw err;
        });

        return response.data;
    };

    public revokeOAuthAppAccess = async (oAuthAppId: string): Promise<void> => {
        const response = await this.axios.delete(this.getEndpoint(`/v1/user/settings/oauth/${oAuthAppId}/revoke`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
