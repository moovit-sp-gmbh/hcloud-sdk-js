import Base from "../../../base";
import { Secret } from "../../../interfaces/High5";

export default class High5Secret extends Base {
    /**
     * getSecrets paginated request to get secrets of a space
     *            Only the secret keys are sent back in the response. Not the encrypted values.
     * @param {string} orgName - Name of the organization
     * @param {string} spaceName - Name of the space
     * @param {number} [limit] - Page size. Defaults to 25.
     * @param {number} [page] - Page number. Default to 0.
     */
    async getSecrets(orgName: string, spaceName: string, limit = 25, page = 0): Promise<Secret[]> {
        const resp = await this.axios.get<Secret[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets?limit=${limit}&page=${page}`)
        );

        return resp.data;
    }

    /**
     * addSecret associate a secret key-value pair with a space. Will fail if a secret with the same
     * key already exists.
     * @param {string} orgName - Name of the organization
     * @param {string} spaceName - Name of the space
     * @param {string} key - Key of the key-value pair
     * @param {string} value - Value of the key-value pair
     */
    async addSecret(orgName: string, spaceName: string, key: string, value: string): Promise<Secret> {
        const resp = await this.axios.post<Secret>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets`), {
            key,
            value,
        });

        return resp.data;
    }

    /**
     * updateSecret set a new value for an existent secret key-value pair. Will fail if no secret with the same
     * key exists.
     * @param {string} orgName - Name of the organization
     * @param {string} spaceName - Name of the space
     * @param {string} key - Key of the key-value pair
     * @param {string} value - The new value of the key-value pair
     */
    async updateSecret(orgName: string, spaceName: string, key: string, value: string): Promise<Secret> {
        const resp = await this.axios.put<Secret>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets/${key}`), {
            value,
        });

        return resp.data;
    }

    /**
     * deleteSecret delete a key-value pair of the space
     * @param {string} orgName - Name of the organization
     * @param {string} spaceName - Name of the space
     * @param {string} key - Key of the key-value pair
     */
    async deleteSecret(orgName: string, spaceName: string, key: string): Promise<void> {
        await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/settings/secrets/${key}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
