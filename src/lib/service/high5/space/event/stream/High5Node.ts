import base from "../../../../../base";
import { Node, NodeCategory } from "../../../../../interfaces/High5";

export class High5Node extends base {
    /**
     * Get a list of all Nodes within the active Organization (requires READ permission) that are assigned to a specific stream
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param limit the maximum results limit (1-100; defaults to 25)
     * @param page the results to skip (page * limit)
     * @summary Get all nodes
     * @response Nodes[] array holding the Nodes
     */
    public async getAllNodes(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        limit?: number,
        page?: number
    ): Promise<Node[]> {
        limit = limit || 25;
        page = page || 0;
        const resp = await this.axios
            .get<Node[]>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/nodes?page=${page}&limit=${limit}`)
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    }

    /**
     * Get a Node by ID within the active organization (requires READ permission)
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param nodeId Id of the node
     * @summary Get a Node by ID
     * @response Node
     */
    public async getNode(orgName: string, spaceName: string, eventName: string, streamId: string, nodeId: string): Promise<Node> {
        const resp = await this.axios
            .get<Node>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/nodes/${nodeId}`))
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    }

    /**
     * Create a new Node
     * @body An object holding the minimal data required for node creation
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @summary Create a new Node
     * @response Node
     */
    public async createNode(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        nodeCategory: NodeCategory,
        specification: string,
        typescript: string
    ): Promise<Node> {
        const resp = await this.axios
            .post<Node>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/nodes`), {
                category: nodeCategory,
                specification: specification,
                typescript: typescript,
            })
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    }

    /**
     * Delete a Node by ID (requires WRITE permission)
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param nodeId Id of the node
     * @summary Delete an Node by ID
     * @response 204 No content
     */
    public async deleteNode(orgName: string, spaceName: string, eventName: string, streamId: string, nodeId: string): Promise<void> {
        await this.axios
            .delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/nodes/${nodeId}`))
            .catch((err: Error) => {
                throw err;
            });
    }

    /**
     * Patch a Node's content - typescript/javascript fields (requires WRITE permission)
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param nodeId Id of the node
     * @param regenerateSecret whether to recreate a new secret or not
     * @Body A patch object containing the new typescript node definition
     * @summary  Patch a Node
     * @response Node
     */
    public async patchNode(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        nodeId: string,
        regenerateSecret: boolean,
        specification?: string,
        typescript?: string
    ): Promise<Node> {
        const patchNode = {
            specification: specification,
            typescript: typescript,
        };
        if (!specification) {
            delete patchNode.specification;
        }
        if (!typescript) {
            delete patchNode.typescript;
        }

        const resp = await this.axios
            .patch<Node>(
                this.getEndpoint(
                    `/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/nodes/${nodeId}?regenerateSecret=${regenerateSecret}`
                ),
                patchNode
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    }

    /**
     * Get a Node's content by it's secret
     * @param orgName the organizations's name
     * @param spaceName the spaces's name
     * @param eventName the event's name
     * @param streamId the stream's id
     * @param nodeId the node's id
     * @param secret Secret of the Node (a unique sha512 hash)
     * @summary Get a Node's content by it's secret
     * @response raw javascript representation of the Node's content
     */
    public async getNodeContent(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        nodeId: string,
        secret: string
    ): Promise<string> {
        const resp = await this.axios
            .get<string>(
                this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/nodes/${nodeId}/content/${secret}`)
            )
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
