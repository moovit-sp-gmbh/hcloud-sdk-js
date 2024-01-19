export enum AgentStatus {
    BUSY = "BUSY",
    IDLE = "IDLE",
}

export type Agent = {
    _id: string;
    uuid: string;
    ip?: string;
    cpu: string;
    cpuUtilization: number;
    memoryTotal: number;
    memoryUsed: number;
    hostname: string;
    nickname: string;
    osPlatform: string;
    osRelease: string;
    osVersion: string;
    uptime: number;
    status: AgentStatus;
    createDate: number;
    modifyDate: number;
};

export type TargetAgent =
    | Pick<Agent, Exclude<keyof Agent, "uptime">> & {
          connectionUptime: number;
          targetEmail: string;
      };
