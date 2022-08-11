import axios from "axios";
import base, { Options } from "../../base";
import { Node, NodeCategory } from "../../interfaces/High5";

export class High5Node extends base {
    constructor(opts: Options) {
        super(opts);
    }

    /**
     * Get a list of all Nodes within the active Organization (requires READ permission) that are assigned to a specific stream
     * @param streamId Id of the stream the nodes are assigned to
     * @param limit the maximum results (defaults to 500)
     * @param page the results to skip (page * limit)
     * @summary Get all nodes
     * @response Nodes[] array holding the Nodes
     */
    public async getNodes(streamId: string, limit?: number, page?: number): Promise<Node[]> {
        limit = limit || 500;
        page = page || 0;
        const resp = await axios.get<Node[]>(this.getEndpoint(`/v1/node/list/${streamId}?page=${page}&limit=${limit}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    }

    /**
     * Get a Node by ID within the active organization (requires READ permission)
     * @param nodeId Id of the node
     * @summary Get a Node by ID
     * @response Node
     */
    public async getNodeById(nodeId: string): Promise<Node> {
        const resp = await axios.get<Node>(this.getEndpoint(`/v1/node/${nodeId}`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    }

    /**
     * Create a new Node
     * @body An object holding the minimal data required for node creation
     * @param streamId Id of the stream the nodes should be assigned to
     * @summary Create a new Node
     * @response Node
     */
    public async createNode(nodeCategory: NodeCategory, specification: string, typescript: string, streamId: string): Promise<Node> {
        const resp = await axios
            .post<Node>(this.getEndpoint(`/v1/node/${streamId}`), {
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
     * @param nodeId Id of the node
     * @summary Delete an Node by ID
     * @response 204 No content
     */
    public async deleteNodeById(nodeId: string): Promise<void> {
        const resp = await axios.delete<void>(this.getEndpoint(`/v1/node/${nodeId}`)).catch((err: Error) => {
            throw err;
        });
    }

    /**
     * Patch a Node's content - typescript/javascript fields (requires WRITE permission)
     * @param nodeId Id of the node
     * @param regernateSecret whether to recreate a new secret or not
     * @Body A patch object containing the new typescript node definition
     * @summary  Patch a Node
     * @response Node
     */
    public async patchNode(nodeId: string, regernateSecret: boolean, specification?: string, typescript?: string): Promise<Node> {
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

        const resp = await axios
            .patch<Node>(this.getEndpoint(`/v1/node/${nodeId}?regenerateSecret=${regernateSecret}`), patchNode)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    }

    /**
     * Get a Node's content by it's secret
     * @param secret Secret of the Node (a unique sha512 hash)
     * @summary Get a Node's content by it's secret
     * @response raw javascript representation of the Node's content
     */
    public async getNodeContent(secret: string): Promise<string> {
        const resp = await axios.get<string>(this.getEndpoint(`/v1/node/${secret}/content`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/high5${endpoint}`;
    }
}
