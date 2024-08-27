import { AxiosResponse } from "axios";
import { PaginatedResponse } from "../interfaces/global/PaginatedResponse";

export function createPaginatedResponse<T>(response: AxiosResponse<T[]>): PaginatedResponse<T> {
    return {
        items: response.data,
        total: parseInt(String(response.headers["total"]), 10),
    };
}
