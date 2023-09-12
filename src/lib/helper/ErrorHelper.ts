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

export function isHCloudError(obj: unknown): obj is HCloudError {
    return typeof obj === "object" && obj instanceof HCloudError;
}
