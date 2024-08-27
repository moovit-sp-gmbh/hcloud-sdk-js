export interface PaginatedResponse<T> {
    items: Array<T>;
    total: number;
}
