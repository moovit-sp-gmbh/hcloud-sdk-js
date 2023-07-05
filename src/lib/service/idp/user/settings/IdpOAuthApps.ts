import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../base";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { SearchFilter, Sorting } from "../../../../interfaces/Global";
import { OAuthApp } from "../../../../interfaces/IDP";

export class IdpOAuthApps extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    public searchOAuthApps = async (filters?: SearchFilter[], sorting?: Sorting, limit = 25, page = 0): Promise<[OAuthApp[], number]> => {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });
        const response = await this.axios
            .post<OAuthApp[]>(this.getEndpoint(`/v1/user/settings/oauth/search?limit=${limit}&page=${page}`), {
                filters: filtersDTO,
                sorting: sorting,
            })
            .catch((err: Error) => {
                throw err;
            });

        return [response.data, parseInt(String(response.headers.total), 10)];
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
