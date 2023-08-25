/**
 * Refers to a GitHub release.
 */
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

/**
 * Refers to an asset (file) within a GitHub release.
 *
 * A WaveEngineReleaseAsset that belong to a certain WaveRelease will
 * share the same releaseTag and latest value, but will have a different
 * browserUrl since the URL will refer to the specific asset.
 */
export interface WaveEngineReleaseAsset {
    releaseTag: string;
    browserUrl: string;
    latest?: boolean;
}
