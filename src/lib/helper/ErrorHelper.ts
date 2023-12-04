import axios from "axios";
import HCloudError from "../interfaces/global/HCloudError";

export default function wrapError<T>(error: T): T | HCloudError {
    if (axios.isAxiosError(error) && error.response) {
        return new HCloudError(
            error.response.status,
            error.response.statusText,
            error.response.data.code,
            error.response.data.error,
            error.response.data.message
        );
    }
    return error;
}

/**
 * Checks if error is of type HCloudError. An HCloudError is comming from the SDK and holds
 * the information of a custom error that was initially thrown in a hcloud backend.
 */
export function isHCloudError(obj: unknown): obj is HCloudError {
    return typeof obj === "object" && obj instanceof HCloudError;
}
