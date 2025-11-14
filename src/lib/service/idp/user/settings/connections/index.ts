import Base, { MaybeRaw } from "../../../../../Base";
import { ConnectionSettings } from "../../../../../interfaces/idp/user/ConnectionSettings";

export class IdpConnections extends Base {
    /**
     * Get connection settings for all organizations the user is a part of.
     *
     * Must have a set authentication token.
     *
     * @returns connection settings for each organization
     */
    async get<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, ConnectionSettings>> {
        const res = await this.axios.get<ConnectionSettings>(this.getEndpoint());

        return (raw?.raw ? res : res.data) as MaybeRaw<R, ConnectionSettings>;
    }

    protected getEndpoint(): string {
        return `${this.options.server}/api/account/v1/user/settings/connections`;
    }
}
