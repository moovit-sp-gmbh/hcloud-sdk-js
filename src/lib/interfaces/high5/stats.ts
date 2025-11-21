export interface Stats {
    orgName: string;
    spaceName?: string;
    spaces: number;
    events: number;
    streams: number;
    secrets: number;
    webhooks: number;
    jobs: number;
    databases: number;
    documents: number;
    executions: {
        [year: number]: {
            [month: number]: {
                [day: number]: { count: number };
            };
        };
    };
}
