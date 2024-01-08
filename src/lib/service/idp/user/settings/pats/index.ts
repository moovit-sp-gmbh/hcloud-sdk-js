import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { Pat, PatCreate, PatUpdate } from "../../../../../interfaces/idp/user/Pat";

export class IdpPat extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves all personal access tokens (PATs) of the requesting user.
     * @returns Array of PAT objects
     */
    public getPats = async (): Promise<Pat[]> => {
        const resp = await this.axios.get<Pat[]>(this.getEndpoint(`/v1/user/settings/pats`));

        return resp.data;
    };

    /**
     * Retrieves a single personal access token (PAT) by ID.
     * @param patId ID of the PAT
     * @returns The requested PAT object
     */
    public getPat = async (patId: string): Promise<Pat> => {
        const resp = await this.axios.get<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`));

        return resp.data;
    };

    /**
     * Regenerates a personal access token (PAT).
     * @param patId ID of the PAT
     * @returns PAT object holding the updated token
     */
    public regeneratePat = async (patId: string): Promise<Pat> => {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}/regenerate`));

        return resp.data;
    };

    /**
     * Creates a new personal access token (PAT) for requesting user
     * @param patCreate Object with informations needed to create a PAT: Name, expiration and scopes
     * @returns the created PAT object
     */
    public generatePat = async (patCreate: PatCreate): Promise<Pat> => {
        const resp = await this.axios.post<Pat>(this.getEndpoint(`/v1/user/settings/pats`), patCreate);

        return resp.data;
    };

    /**
     * Updates an existing PAT object.
     * @param patId ID of the pat object
     * @param patUpdate Object containing new name and scopes
     * @returns the updated PAT object
     */
    public updatePat = async (patId: string, patUpdate: PatUpdate): Promise<Pat> => {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`), patUpdate);

        return resp.data;
    };

    /**
     * Deletes a personal access token (PAT) of the requesting User.
     * @param patId Id of the PAT
     */
    public deletePat = async (patId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/pats/${patId}`));
    };

    /**
     * Deletes all personal access tokens (PATs) of the requesting User.
     */
    public deleteAllPats = async (): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/pats`));
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
