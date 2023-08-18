export interface WaveRelease {
    releaseTag: string;
    browserUrl: string;
    latest?: boolean;
}

export interface WaveEngine {
    size: number;
    md5: string;
    content: string;
}

export interface WaveEngineReleaseAsset {
    releaseTag: string;
    browserUrl: string;
    latest?: boolean;
}
