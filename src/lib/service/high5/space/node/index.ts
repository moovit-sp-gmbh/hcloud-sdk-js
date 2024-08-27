import Base from "../../../../Base";
import { Node, NodeCategory } from "../../../../interfaces/high5/space/event/stream/node";

export default class High5Node extends Base {
    /**
     * Retrieves all Nodes for the specified stream.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Array containg the Nodes
     */
    public async getAllNodes(orgName: string, spaceName: string, limit?: number, page?: number): Promise<Node[]> {
        limit = limit || 25;
        page = page || 0;
        const resp = await this.axios.get<Node[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes?page=${page}&limit=${limit}`));

        return resp.data;
    }

    /**
     * Retrieves a Node by its ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param nodeId Id of the Node
     * @returns The requested Node
     */
    public async getNode(orgName: string, spaceName: string, nodeId: string): Promise<Node> {
        const resp = await this.axios.get<Node>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes/${nodeId}`));

        return resp.data;
    }

    /**
     * Adds a new Node to a stream.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param nodeCategory Category of the node
     * @param specification Specification of the node as a base64 string
     * @param typescript Typescript code as a base64 string
     * @returns The created Node
     */
    public async createNode(
        orgName: string,
        spaceName: string,
        nodeCategory: NodeCategory,
        specification: string,
        typescript: string
    ): Promise<Node> {
        const resp = await this.axios.post<Node>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes`), {
            category: nodeCategory,
            specification: specification,
            typescript: typescript,
        });

        return resp.data;
    }

    /**
     * Deletes a Node by its ID
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param nodeId Id of the node
     */
    public async deleteNode(orgName: string, spaceName: string, nodeId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes/${nodeId}`));
    }

    /**
     * Patches the Typescript code and specification of the Node.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param nodeId ID of the node
     * @param regenerateSecret Boolean to specify if a new secret shall be created
     * @param specification (optional) Specification of the node as a base64 string
     * @param typescript (optional) Typescript code as a base64 string
     * @return The updated Node
     */
    public async patchNode(
        orgName: string,
        spaceName: string,
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

        const resp = await this.axios.patch<Node>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes/${nodeId}?regenerateSecret=${regenerateSecret}`),
            patchNode
        );

        return resp.data;
    }

    /**
     * Retrieves the content (raw javascript code) of a Node.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param secret Secret of the Node (a unique sha512 hash)
     * @rerurns Raw javascript representation of the Node's content
     */
    public async getNodeContent(orgName: string, spaceName: string, secret: string): Promise<string> {
        const resp = await this.axios.get<string>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes/content/${secret}`));

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
