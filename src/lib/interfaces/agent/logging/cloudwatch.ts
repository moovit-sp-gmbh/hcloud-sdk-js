export interface AddCloudWatchDto {
    logGroupName?: string;
    logStreamName?: string;
    awsRegion?: string;
    retentionInDays?: number;
    uploadRate: number;
    level?: string;
    jsonMessage: boolean;
    awsOptions?: {
        region?: string;
        credentials?: {
            accessKeyId: string;
            secretAccessKey: string;
            sessionToken?: string;
        };
    };
}

export interface CloudWatchDto {
    name: string;
    logGroupName?: string;
    logStreamName?: string;
    level: string;
}
