import Base, { MaybeRaw } from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { Pat, PatCreate, PatUpdate } from "../../../../../interfaces/idp/user/Pat";

export class IdpPat extends Base {
    /**
     * Search all personal access tokens (PATs) of the requesting user.
     * @returns Paginated response of PAT objects
     */
    async searchPats<R extends boolean = false>(
        { filters, sorting, limit = 25, page = 0 }: SearchParams,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Pat>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<Pat[]>(
            this.getEndpoint(`/v1/user/settings/pats/search`),
            {
                filters: filtersDTO,
                sorting,
            },
            {
                params: { limit, page },
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<R, PaginatedResponse<Pat>>;
    }

    /**
     * Retrieves a single personal access token (PAT) by ID.
     * @param patId ID of the PAT
     * @returns The requested PAT object
     */
    async getPat<R extends boolean = false>(patId: string, raw?: { raw: R }): Promise<MaybeRaw<R, Pat>> {
        const resp = await this.axios.get<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Pat>;
    }

    /**
     * Regenerates a personal access token (PAT).
     * @param patId ID of the PAT
     * @returns PAT object holding the updated token
     */
    async regeneratePat<R extends boolean = false>(patId: string, token?: string, raw?: { raw: R }): Promise<MaybeRaw<R, Pat>> {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}/regenerate`), { token });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Pat>;
    }

    /**
     * Creates a new personal access token (PAT) for requesting user
     * @param patCreate Object with informations needed to create a PAT: Name, expiration and scopes
     * @returns the created PAT object
     */
    async generatePat<R extends boolean = false>(patCreate: PatCreate, raw?: { raw: R }): Promise<MaybeRaw<R, Pat>> {
        const resp = await this.axios.post<Pat>(this.getEndpoint(`/v1/user/settings/pats`), patCreate);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Pat>;
    }

    /**
     * Updates an existing PAT object.
     *
     * Use an expiration value of -1 to remove the token's expiration date.
     *
     * @param patId ID of the pat object
     * @param patUpdate Object containing new name, expiration and scopes
     * @returns the updated PAT object
     */
    async updatePat<R extends boolean = false>(patId: string, patUpdate: PatUpdate, raw?: { raw: R }): Promise<MaybeRaw<R, Pat>> {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`), patUpdate);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Pat>;
    }

    /**
     * Deletes a personal access token (PAT) of the requesting User.
     * @param patId Id of the PAT
     */
    async deletePat<R extends boolean = false>(patId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/pats/${patId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Deletes all personal access tokens (PATs) of the requesting User.
     */
    async deleteAllPats<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/pats`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
