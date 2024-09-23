import Base from "../../../../../Base";
import { ConnectionSettings } from "../../../../../interfaces/idp/user/ConnectionSettings";

export class IdpConnections extends Base {
    /**
     * Get connection settings for all organizations the user is a part of.
     *
     * Must have a set authentication token.
     *
     * @returns connection settings for each organization
     */
    async get(): Promise<ConnectionSettings> {
        const res = await this.axios.get<ConnectionSettings>(this.getEndpoint());

        return res.data;
    }

    protected getEndpoint(): string {
        return `${this.options.server}/api/account/v1/user/settings/connections`;
    }
}
