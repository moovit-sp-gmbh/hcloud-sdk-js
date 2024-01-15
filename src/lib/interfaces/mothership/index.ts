export enum AgentStatus {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
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
    createDate: number;
    modifyDate: number;
};

export type TargetAgent = Agent & {
    targetEmail: string;
};
