import Base from "../../../Base";
import { Context } from "../../../interfaces/agent/context";

export class AgentContext extends Base {
    /**
     * Retrieves all contexts.
     * @returns The requested contexts
     */
    async getContexts(): Promise<Context[]> {
        const resp = await this.axios.get<Context[]>(this.getEndpoint(`/v1/context`));

        return resp.data;
    }

    /**
     * Add a new context.
     * @returns The newly created context
     */
    async addContext(server: string, email: string, token: string, enabled: boolean): Promise<Context> {
        const resp = await this.axios.post<Context>(this.getEndpoint(`/v1/context`), {
            server,
            email,
            token,
            enabled,
        });

        return resp.data;
    }

    /**
     * Update an existing context.
     * @returns The updated context
     */
    async updateContext(uuid: string, server: string, email: string, token: string, enabled: boolean): Promise<Context> {
        const resp = await this.axios.patch<Context>(this.getEndpoint(`/v1/context/${uuid}`), {
            server,
            email,
            token,
            enabled,
        });

        return resp.data;
    }

    /**
     * Get an existing context.
     * @returns The requested context
     */
    async getContext(uuid: string): Promise<Context> {
        const resp = await this.axios.get<Context>(this.getEndpoint(`/v1/context/${uuid}`));

        return resp.data;
    }

    /**
     * Delete a context.
     * @returns void
     */
    async deleteContext(uuid: string): Promise<void> {
        await this.axios.delete<Context>(this.getEndpoint(`/v1/context/${uuid}`));
    }

    /**
     * Patch the enabled property of a Context.
     * @returns Updated Context
     */
    async patchContextEnabled(uuid: string, enabled: boolean): Promise<Context> {
        const res = await this.axios.patch<Context>(this.getEndpoint(`/v1/context/${uuid}/enabled`), {
            enabled,
        });

        return res.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
