export enum AgentStatus {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
}

export type Agent = {
    uuid: string;
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
