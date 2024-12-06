export type DebugCommand = ContinueDebugCommand | StepBackDebugCommand | StepForwardDebugCommand | SetValueDebugCommand;

export enum CommandType {
    CONTINUE = "CONTINUE",
    STEP_BACK = "STEP_BACK",
    STEP_FORWARD = "STEP_FORWARD",
    SET_VALUE = "SET_VALUE",
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
