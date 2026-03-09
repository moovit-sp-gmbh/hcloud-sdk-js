export const disableCacheHeaders = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
};

export type RefreshToken = {
    token: string;
    expiresAt: number;
    callback?: (newAccessToken: string, newRefreshToken: RefreshToken) => void;
};
