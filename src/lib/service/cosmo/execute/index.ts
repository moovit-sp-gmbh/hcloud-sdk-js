import Base, { MaybeRaw } from "../../../Base";
import { Event } from "../../../interfaces/high5/space/event";
import { High5ExecutionResponse } from "../../../interfaces/high5/space/execution";

/**
 * @class CosmoExecute
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Provides methods to discover and execute custom High5 events of a Cosmo space's connected High5 space.
 */
export class CosmoExecute extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * List the custom events of the space's connected High5 space
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @returns The custom events of the connected High5 space
     */
    async listCustomEvents<R extends boolean = false>(orgName: string, spaceName: string, raw?: { raw: R }): Promise<MaybeRaw<R, Event[]>> {
        const resp = await this.axios.get<Event[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/custom`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Event[]>;
    }

    /**
     * Execute a custom event of the space with an asset as payload
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the custom event
     * @param assetId ID of the asset
     * @returns The started High5 executions
     */
    async executeAssetCustomEvent<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        assetId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, High5ExecutionResponse[]>> {
        const resp = await this.axios.post<High5ExecutionResponse[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/custom/asset/${eventName}/${assetId}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, High5ExecutionResponse[]>;
    }

    /**
     * Execute a custom event of the space with a comment as payload
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param eventName Name of the custom event
     * @param namespaceName Name of the namespace the comment belongs to
     * @param commentId ID of the comment
     * @returns The started High5 executions
     */
    async executeCommentCustomEvent<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        eventName: string,
        namespaceName: string,
        commentId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, High5ExecutionResponse[]>> {
        const resp = await this.axios.post<High5ExecutionResponse[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/execute/custom/asset/${eventName}/${namespaceName}/${commentId}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, High5ExecutionResponse[]>;
    }
}
