import Base, { MaybeRaw } from "../../../Base";
import { Context } from "../../../interfaces/agent/context";

export class AgentContext extends Base {
    /**
     * Retrieves all contexts.
     * @returns The requested contexts
     */
    async getContexts<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, Context[]>> {
        const resp = await this.axios.get<Context[]>(this.getEndpoint(`/v1/context`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Context[]>;
    }

    /**
     * Add a new context.
     * @returns The newly created context
     */
    async addContext<R extends boolean = false>(
        server: string,
        email: string,
        token: string,
        enabled: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Context>> {
        const resp = await this.axios.post<Context>(this.getEndpoint(`/v1/context`), {
            server,
            email,
            token,
            enabled,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Context>;
    }

    /**
     * Add a new context by using a service accounts PAT token.
     * @returns The newly created context
     */
    async addServiceAccountContext<R extends boolean = false>(
        server: string,
        token: string,
        enabled: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Context>> {
        const resp = await this.axios.post<Context>(this.getEndpoint(`/v1/context`), {
            server,
            token: token.toLowerCase().startsWith("bearer") ? token : `Bearer ${token}`,
            enabled,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Context>;
    }

    /**
     * Update an existing context.
     * @returns The updated context
     */
    async updateContext<R extends boolean = false>(
        uuid: string,
        server: string,
        email: string,
        token: string,
        enabled: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Context>> {
        const resp = await this.axios.patch<Context>(this.getEndpoint(`/v1/context/${uuid}`), {
            server,
            email,
            token,
            enabled,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Context>;
    }

    /**
     * Get an existing context.
     * @returns The requested context
     */
    async getContext<R extends boolean = false>(uuid: string, raw?: { raw: R }): Promise<MaybeRaw<R, Context>> {
        const resp = await this.axios.get<Context>(this.getEndpoint(`/v1/context/${uuid}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Context>;
    }

    /**
     * Delete a context.
     * @returns void
     */
    async deleteContext<R extends boolean = false>(uuid: string, raw?: { raw: R }): Promise<MaybeRaw<R, Context>> {
        const resp = await this.axios.delete<Context>(this.getEndpoint(`/v1/context/${uuid}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Context>;
    }

    /**
     * Patch the enabled property of a Context.
     * @returns Updated Context
     */
    async patchContextEnabled<R extends boolean = false>(uuid: string, enabled: boolean, raw?: { raw: R }): Promise<MaybeRaw<R, Context>> {
        const res = await this.axios.patch<Context>(this.getEndpoint(`/v1/context/${uuid}/enabled`), {
            enabled,
        });

        return (raw?.raw ? res : res.data) as MaybeRaw<R, Context>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/agent${endpoint}`;
    }
}
