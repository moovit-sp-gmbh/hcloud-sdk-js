import { DesignerNode } from "./StreamDesign";

export type DesignOperation = AddNode | DeleteNode | EditNode | MoveNode | LinkNodes | UnlinkNodes;

export type AddNode = {
    target: OperationTarget.NODE;
    type: NodeOperation.ADD;
    details: DesignerNode;
};

export type DeleteNode = {
    target: OperationTarget.NODE;
    type: NodeOperation.DELETE;
    uuid: string;
};

export type EditNode = {
    target: OperationTarget.NODE;
    type: NodeOperation.EDIT;
    uuid: string;
    changes: Partial<{
        customDescription: string;
        customNode: {
            _id: string;
        };
        color: string;
        bypass: boolean;
    }>;
};

export type MoveNode = {
    target: OperationTarget.NODE;
    type: NodeOperation.MOVE;
    uuid: string;
    newCoords: {
        x: number;
        y: number;
    };
};

export type LinkNodes = {
    target: OperationTarget.LINK;
    type: LinkOperation.LINK;
    details: {
        uuid: string;
        from: {
            nodeUuid: string;
            connectorUuid: string;
        };
        to: {
            nodeUuid: string;
            connectorUuid: string;
        };
    };
};

export type UnlinkNodes = {
    target: OperationTarget.LINK;
    type: LinkOperation.UNLINK;
    uuid: string;
};

export enum OperationTarget {
    NODE = "NODE",
    LINK = "LINK",
}

export enum NodeOperation {
    ADD = "ADD",
    DELETE = "DELETE",
    MOVE = "MOVE",
    EDIT = "EDIT",
}

export enum LinkOperation {
    LINK = "LINK",
    UNLINK = "UNLINK",
}
