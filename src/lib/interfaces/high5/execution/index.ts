import { DesignerNode } from "../space/event/stream/design/StreamDesign";

export type DebugCommand = ContinueDebugCommand | StepBackDebugCommand | StepForwardDebugCommand | SetValueDebugCommand | ReplaceNodeDebugCommand;

export enum CommandType {
    CONTINUE = "CONTINUE",
    STEP_BACK = "STEP_BACK",
    STEP_FORWARD = "STEP_FORWARD",
    SET_VALUE = "SET_VALUE",
    REPLACE_NODE = "REPLACE_NODE",
}

export type ContinueDebugCommand = {
    type: CommandType.CONTINUE;
};
export type StepBackDebugCommand = {
    type: CommandType.STEP_BACK;
};
export type StepForwardDebugCommand = {
    type: CommandType.STEP_FORWARD;
};
export type SetValueDebugCommand = {
    type: CommandType.SET_VALUE;
    uuid: string;
    key: string;
    value: unknown;
};
export type ReplaceNodeDebugCommand = {
    type: CommandType.REPLACE_NODE;
    node: DesignerNode;
};
