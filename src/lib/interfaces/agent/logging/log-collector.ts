export interface AddLogCollectorDto {
    name: string;
    host: string;
    port?: number;
    path: string;
    ssl: boolean;
    enabled: boolean;
    auth?: { username: string; password: string };
    headers?: { [key: string]: string };
    batch?: boolean;
    batchInterval?: number;
    batchCount?: number;
    level?: string;
}

export interface LogCollectorDto {
    name: string;
    url: string;
    enabled: boolean;
    auth?: { username: string; password: string };
    headers?: { [key: string]: string };
    batch?: boolean;
    batchInterval?: number;
    batchCount?: number;
    level?: string;
}
