import { AxiosInstance } from "axios";
import base, { Options } from "../../../../base";
import { Pat, PatCreate, PatUpdate } from "../../../../interfaces/IDP";

export class IdpPat extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * getPats requests all pats of a user
     * @returns all pats the request user created until now
     */
    public getPats = async (): Promise<Pat[]> => {
        const resp = await this.axios.get<Pat[]>(this.getEndpoint(`/v1/pat`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * generatePat create a new personal access token for request user
     * @param patCreate the pat object to be created
     * @returns the created pat object
     */
    public generatePat = async (patCreate: PatCreate): Promise<Pat> => {
        const resp = await this.axios.post<Pat>(this.getEndpoint(`/v1/pat`), patCreate).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * regeneratePatToken renews a personal access token (PAT) with existing parameters like scopes and expiration
     * @param patId the id of the pat object
     * @returns the updated pat object
     */
    public regeneratePatToken = async (patId: string): Promise<Pat> => {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/pat/${patId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * regeneratePatToken renew a pat token with existing parameters like scopes and expiration
     * @param patId the id of the pat object
     * @returns the updated pat object
     */
    public updatePatToken = async (patId: string, patUpdate: PatUpdate): Promise<Pat> => {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/pat/${patId}`), patUpdate).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deletePat deletes a pat of a user
     * @param patId the id of the pat
     */
    public deletePat = async (patId: string): Promise<void> => {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/pat/${patId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * deleteAllPats deletes all pats of a user
     */
    public deleteAllPats = async (): Promise<void> => {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/pat`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
