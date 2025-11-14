import Base, { MaybeRaw } from "../../../../Base";
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
    public async getAllNodes<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        limit?: number,
        page?: number,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Node[]>> {
        limit = limit || 25;
        page = page || 0;
        const resp = await this.axios.get<Node[]>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes?page=${page}&limit=${limit}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Node[]>;
    }

    /**
     * Retrieves a Node by its ID.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param nodeId Id of the Node
     * @returns The requested Node
     */
    public async getNode<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        nodeId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Node>> {
        const resp = await this.axios.get<Node>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes/${nodeId}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Node>;
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
    public async createNode<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        nodeCategory: NodeCategory,
        specification: string,
        typescript: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Node>> {
        const resp = await this.axios.post<Node>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes`), {
            category: nodeCategory,
            specification: specification,
            typescript: typescript,
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Node>;
    }

    /**
     * Deletes a Node by its ID
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param nodeId Id of the node
     */
    public async deleteNode<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        nodeId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes/${nodeId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
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
    public async patchNode<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        nodeId: string,
        regenerateSecret: boolean,
        specification?: string,
        typescript?: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Node>> {
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

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Node>;
    }

    /**
     * Retrieves the content (raw javascript code) of a Node.
     * @param orgName Name of the organization
     * @param spaceName Name of the space
     * @param secret Secret of the Node (a unique sha512 hash)
     * @returns Raw javascript representation of the Node's content
     */
    public async getNodeContent<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        secret: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, string>> {
        const resp = await this.axios.get<string>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/nodes/content/${secret}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, string>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}
