import { AxiosInstance } from "axios";
import base, { Options } from "../../../base";
import { AvatarCreated } from "../../../interfaces/Dali";

export class DaliOrganization extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * createAvatar returns the newly created avatar as URL
     * @param {string} orgName the organizations's name
     * @returns {AvatarCreated} AvatarCreated
     */
    public createAvatar = async (orgName: string): Promise<AvatarCreated> => {
        const resp = await this.axios.post<AvatarCreated>(this.getEndpoint(`/v1/avatar/org/${orgName}`), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/dali${endpoint}`;
    }
}