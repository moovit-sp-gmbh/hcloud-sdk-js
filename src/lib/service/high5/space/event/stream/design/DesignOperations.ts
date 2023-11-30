import Base from "../../../../../../Base";
import { Design } from "../../../../../../interfaces/high5";
import {
    AddNode,
    DeleteNode,
    DesignOperation,
    EditNode,
    LinkNodes,
    LinkOperation,
    MoveNode,
    NodeOperation,
    OperationTarget,
    UnlinkNodes,
} from "../../../../../../interfaces/high5/space/event/stream/design/DesignOperation";
import { DesignerNode } from "../../../../../../interfaces/high5/space/event/stream/design/StreamDesign";

export default class DesignOperations extends Base {
    public async send(
        orgName: string,
        spaceName: string,
        eventName: string,
        streamId: string,
        designHash: string,
        operations: DesignOperation[]
    ): Promise<Design> {
        const resp = await this.axios.patch<Design>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/events/${eventName}/streams/${streamId}/design/operations`),
            { hash: designHash, operations }
        );

        return resp.data;
    }

    public addNode(details: DesignerNode): OperationQueue {
        const queue = new OperationQueue(this);
        return queue.addNode(details);
    }

    public deleteNode(uuid: string): OperationQueue {
        const queue = new OperationQueue(this);
        return queue.deleteNode(uuid);
    }

    public moveNode(uuid: string, newCoords: MoveNode["newCoords"]): OperationQueue {
        const queue = new OperationQueue(this);
        return queue.moveNode(uuid, newCoords);
    }

    public editNode(uuid: string, changes: EditNode["changes"]): OperationQueue {
        const queue = new OperationQueue(this);
        return queue.editNode(uuid, changes);
    }

    public linkNodes(details: LinkNodes["details"]): OperationQueue {
        const queue = new OperationQueue(this);
        return queue.linkNodes(details);
    }

    public unlinkNodes(uuid: string): OperationQueue {
        const queue = new OperationQueue(this);
        return queue.unlinkNodes(uuid);
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5${endpoint}`;
    }
}

class OperationQueue {
    operations: DesignOperation[] = [];
    parent: DesignOperations;

    constructor(parent: DesignOperations) {
        this.parent = parent;
    }

    send(orgName: string, spaceName: string, eventName: string, streamId: string, designHash: string): Promise<Design> {
        return this.parent.send(orgName, spaceName, eventName, streamId, designHash, this.operations);
    }

    addNode(details: AddNode["details"]) {
        const op: AddNode = {
            target: OperationTarget.NODE,
            type: NodeOperation.ADD,
            details,
        };

        this.operations.push(op);

        return this;
    }

    deleteNode(uuid: string) {
        const op: DeleteNode = {
            target: OperationTarget.NODE,
            type: NodeOperation.DELETE,
            uuid,
        };

        this.operations.push(op);

        return this;
    }

    moveNode(uuid: string, newCoords: { x: number; y: number }) {
        const op: MoveNode = {
            target: OperationTarget.NODE,
            type: NodeOperation.MOVE,
            uuid,
            newCoords,
        };

        this.operations.push(op);

        return this;
    }

    editNode(uuid: string, changes: EditNode["changes"]) {
        const op: EditNode = {
            target: OperationTarget.NODE,
            type: NodeOperation.EDIT,
            uuid,
            changes,
        };

        this.operations.push(op);

        return this;
    }

    linkNodes(details: LinkNodes["details"]) {
        const op: LinkNodes = {
            target: OperationTarget.LINK,
            type: LinkOperation.LINK,
            details,
        };

        this.operations.push(op);

        return this;
    }

    unlinkNodes(uuid: string) {
        const op: UnlinkNodes = {
            target: OperationTarget.LINK,
            type: LinkOperation.UNLINK,
            uuid,
        };

        this.operations.push(op);

        return this;
    }
}
