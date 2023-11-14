import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { ConnectionSettings } from "../../../../../interfaces/idp/user/ConnectionSettings";

export class IdpConnections extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Get connection settings for all organizations the user is a part of.
     *
     * Must have a set authentication token.
     *
     * @returns connection settings for each organization
     */
    public get = async (): Promise<ConnectionSettings> => {
        const res = await this.axios.get<ConnectionSettings>(this.getEndpoint());

        return res.data;
    };

    /**
     * Update settings to connect to the specified organization
     *
     * Must have a set authentication token.
     *
     * @param organizationId ID of the organization
     * @returns connection settings for each organization
     */
    public connectTo = async (organizationId: string): Promise<ConnectionSettings> => {
        const res = await this.axios.post<ConnectionSettings>(this.getEndpoint(), { organizationId });

        return res.data;
    };

    /**
     * Update settings to disconnect to the specified organization
     *
     * Must have a set authentication token.
     *
     * @param organizationId ID of the organization
     */
    public disconnectFrom = async (organizationId: string): Promise<void> => {
        await this.axios.delete<void>(this.getEndpoint(), { data: { organizationId } });
    };

    /**
     * Bulk update connection settings
     *
     * If an ID is in both arrays then the user will end up connected to that organization.
     *
     * Must have a set authentication token.
     *
     * @param connect Array of organization IDs to connect to.
     * @param disconnect Array of organization IDs to disconnect from.
     * @returns connection settings for each organization
     */
    public bulkUpdate = async (connect: string[], disconnect: string[]): Promise<ConnectionSettings> => {
        const res = await this.axios.patch<ConnectionSettings>(this.getEndpoint(), { connect, disconnect });

        return res.data;
    };

    protected getEndpoint(): string {
        return `${this.options.server}/api/account/v1/user/settings/connections`;
    }
}
