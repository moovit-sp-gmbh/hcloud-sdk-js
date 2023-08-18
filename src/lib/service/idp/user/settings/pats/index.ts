import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { Pat, PatCreate, PatUpdate } from "../../../../../interfaces/idp/user/Pat";

export class IdpPat extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * getPats requests all pats of a user
     * @returns all pats the request user created until now
     */
    public getPats = async (): Promise<Pat[]> => {
        const resp = await this.axios.get<Pat[]>(this.getEndpoint(`/v1/user/settings/pats`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * getPat requests a single pat by it's id
     * @returns the Pat object without the token
     */
    public getPat = async (patId: string): Promise<Pat> => {
        const resp = await this.axios.get<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * regeneratePat regenerates the token of a pat
     * @param patId the id of the pat
     * @returns the Pat object holding the new patToken
     */
    public regeneratePat = async (patId: string): Promise<Pat> => {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`)).catch((err: Error) => {
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
        const resp = await this.axios.post<Pat>(this.getEndpoint(`/v1/user/settings/pats`), patCreate).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * updatePat renew a pat token with existing parameters expiration and potentially change the scope
     * @param patId the id of the pat object
     * @returns the updated pat object
     */
    public updatePat = async (patId: string, patUpdate: PatUpdate): Promise<Pat> => {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`), patUpdate).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deletePat deletes a pat of a user
     * @param patId the id of the pat
     */
    public deletePat = async (patId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/pats/${patId}`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * deleteAllPats deletes all pats of a user
     */
    public deleteAllPats = async (): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/pats`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
