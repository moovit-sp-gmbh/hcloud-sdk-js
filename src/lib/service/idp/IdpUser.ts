import axios from "axios";
import base, { Options } from "../../base";
import { AuditLog } from "../../interfaces/Auditor";
import { Organization, PatchUser, User } from "../../interfaces/IDP";
import { IdpOrganizationMember } from "./IdpOrganizationMember";

export class IdpUser extends base {
    /**
     * patchUser update an entity of a user partially
     * @param user the user object
     * @returns User object
     */
    public patchUser = async (user: PatchUser): Promise<User> => {
        const resp = await axios.patch<User>(this.getEndpoint(`/v1/user`), user).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * deleteUser deletes a user from the system
     * @returns User object
     */
    public deleteUser = async (): Promise<void> => {
        const resp = await axios.delete<void>(this.getEndpoint(`/v1/user`)).catch((err: Error) => {
            throw err;
        });
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/account${endpoint}`;
    }
}
