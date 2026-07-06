import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, Sorting } from "../../../../interfaces/global";
import { StorageConfiguration, StorageCreateDto, StorageDto, StoragePatchDto } from "../../../../interfaces/global/Storage";

export class IdpOrganizationStorages extends Base {
    /**
     * Creates a new Storage in the specified Organization.
     * @param orgName Name of the Organization
     * @param storageCreate Storage creation data
     * @returns The created Storage
     */
    async createStorage<R extends boolean = false>(
        orgName: string,
        storageCreate: StorageCreateDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, StorageDto>> {
        const resp = await this.axios.post<StorageDto>(this.getEndpoint(`/${orgName}/storage`), storageCreate);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StorageDto>;
    }

    /**
     * Updates an existing Storage.
     * @param orgName Name of the Organization
     * @param storageId ID of the Storage
     * @param storagePatchDto Storage patch data
     * @param raw (optional) If true, returns the raw Axios response instead of the data
     * @returns The updated Storage object
     */
    async patchStorage<R extends boolean = false>(
        orgName: string,
        storageId: string,
        storagePatchDto: StoragePatchDto,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, StorageDto>> {
        const resp = await this.axios.patch<StorageDto>(this.getEndpoint(`/${orgName}/storage/${storageId}`), storagePatchDto);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StorageDto>;
    }

    /**
     * Retrieves all Storages of an Organization that match the provided search filter(s). Returns all Storages if no search filter is provided.
     * @param orgName Name of the organization
     * @param filters (optional) Array of search filters
     * @param sorting (optional) Sorting object
     * @param limit (optional) Max number of results (1-100; defaults to 25)
     * @param page (optional) Page number: Skip the first (page * limit) results (defaults to 0)
     * @returns Object containing an array of Storages and the total number of results found in the database (independent of limit and page)
     */
    async searchStorages<R extends boolean = false>(
        params: {
            orgName: string;
            filters: SearchFilter[];
            sorting?: Sorting;
            limit?: number;
            page?: number;
        },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<StorageDto>>> {
        const limit = params.limit || 25;
        const page = params.page || 0;

        const filtersDTO = params.filters.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<StorageDto[]>(this.getEndpoint(`/${params.orgName}/storage/search?limit=${limit}&page=${page}`), {
            filters: filtersDTO,
            sorting: params.sorting,
        });

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<StorageDto>
        >;
    }

    /**
     * Retrieves the Storage configuration for the specified Storage ID or the default Storage if no ID is provided. Requires a Personal Access Token (PAT) with appropriate permissions.
     *
     * @param pat Personal Access Token
     * @param storageId (optional) ID of storage. If not provided or "default", retrieves the default storage configuration.
     * @param decrypt (optional) If true, decrypts the storage configuration
     * @param raw (optional) If true, returns the raw Axios response instead of the data
     * @returns The Storage configuration
     */
    async getStorageConfig<R extends boolean = false>(
        pat: string,
        storageId = "default",
        decrypt = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, StorageConfiguration>> {
        const resp = await this.axios.get<StorageConfiguration>(`${this.options.server}/api/account/v1/storage/${storageId}?decrypt=${decrypt}`, {
            headers: {
                Authorization: `Bearer ${pat}`,
                "x-hcloud-login-enforce": "true",
            },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StorageConfiguration>;
    }

    /**
     * Updates the avatar of the specified storage
     * @param orgName Name of the organization
     * @param storageId ID of the storage
     * @param file Image as Javascript File
     * @returns Storage with updated avatarUrl
     */
    async updateAvatar<R extends boolean = false>(
        orgName: string,
        storageId: string,
        file: File,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, StorageDto>> {
        const data = new FormData();
        data.append("avatar", file);

        const resp = await this.axios.patch<StorageDto>(this.getEndpoint(`/${orgName}/storage/${storageId}/avatar`), data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, StorageDto>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1/org${endpoint}`;
    }
}
