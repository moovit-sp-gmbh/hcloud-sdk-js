import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { Secret } from "../../../../../interfaces/high5/space/secret";

export default class High5Secret extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Requests all secret keys of the provided space (paginated request).
     * Only the keys of the secret are sent back in the response, not the actual encrypted values.
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param limit - (optional) Max number of results (1-100; defaults to 25)
     * @param page - (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array of secret keys
     */
    async getSecrets(orgName: string, spaceName: string, limit = 25, page = 0): Promise<Secret[]> {
        const resp = await this.axios.get<Secret[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets?limit=${limit}&page=${page}`)
        );

        return resp.data;
    }

    /**
     * Adds a secret key-value pair to a space.
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     * @param value - Value of the key-value pair
     * @param encrypted - (optional) Boolean defining if the value should be stored encrypted (defaults to false).
     * @returns The created Secret
     */
    async addSecret(orgName: string, spaceName: string, key: string, value: string, encrypted = false): Promise<Secret> {
        const resp = await this.axios.post<Secret>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets`), {
            key,
            value,
            encrypted,
        });

        return resp.data;
    }

    /**
     * Updates the value for an existent secret key-value pair.
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     * @param value - The new value of the key-value pair
     * @param encrypted - (optional) Boolean defining if the value should be stored encrypted (defaults to false).
     * @returns The updated Secret
     */
    async updateSecret(orgName: string, spaceName: string, key: string, value: string, encrypted = false): Promise<Secret> {
        const resp = await this.axios.put<Secret>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets/${key}`), {
            value,
            encrypted,
        });

        return resp.data;
    }

    /**
     * Deletes a key-value pair of the space
     * @param orgName - Name of the organization
     * @param spaceName - Name of the space
     * @param key - Key of the key-value pair
     */
    async deleteSecret(orgName: string, spaceName: string, key: string): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets/${key}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
