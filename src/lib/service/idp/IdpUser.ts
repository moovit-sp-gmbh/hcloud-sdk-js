import { AxiosInstance } from "axios";
import base, { Options } from "../../base";
import { AuditLog } from "../../interfaces/Auditor";
import { Organization, Pat, PatchUser, PatCreate, Scopes, User } from "../../interfaces/IDP";
import { IdpOrganizationMember } from "./IdpOrganizationMember";

export class IdpUser extends base {
    /**
     * patchUser update an entity of a user partially
     * @param user the user object
     * @returns User object
     */
    public patchUser = async (user: PatchUser): Promise<User> => {
        const resp = await this.axios.patch<User>(this.getEndpoint(`/v1/user`), user).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteUser deletes a user from the system
     * @returns User object
     */
    public deleteUser = async (): Promise<void> => {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/user`)).catch((err: Error) => {
            throw err;
        });
    };

    /**
     * getScopes requests all available scopes
     * @returns Array of available scopes
     */
    public getScopes = async (): Promise<Scopes[]> => {
        const resp = await this.axios.get<Scopes[]>(this.getEndpoint(`/v1/scopes`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

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
     * regeneratePatToken renew a pat token with existing parameters like scopes and expiration
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
