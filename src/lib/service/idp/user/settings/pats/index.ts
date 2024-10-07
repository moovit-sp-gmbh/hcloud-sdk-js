import Base from "../../../../../Base";
import { createPaginatedResponse } from "../../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../../interfaces/global";
import { Pat, PatCreate, PatUpdate } from "../../../../../interfaces/idp/user/Pat";

export class IdpPat extends Base {
    /**
     * Search all personal access tokens (PATs) of the requesting user.
     * @returns Paginated response of PAT objects
     */
    async searchPats({ filters, sorting, limit = 25, page = 0 }: SearchParams): Promise<PaginatedResponse<Pat>> {
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

        return createPaginatedResponse(resp) as PaginatedResponse<Pat>;
    }

    /**
     * Retrieves a single personal access token (PAT) by ID.
     * @param patId ID of the PAT
     * @returns The requested PAT object
     */
    async getPat(patId: string): Promise<Pat> {
        const resp = await this.axios.get<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`));

        return resp.data;
    }

    /**
     * Regenerates a personal access token (PAT).
     * @param patId ID of the PAT
     * @returns PAT object holding the updated token
     */
    async regeneratePat(patId: string, token?: string): Promise<Pat> {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}/regenerate`), { token });

        return resp.data;
    }

    /**
     * Creates a new personal access token (PAT) for requesting user
     * @param patCreate Object with informations needed to create a PAT: Name, expiration and scopes
     * @returns the created PAT object
     */
    async generatePat(patCreate: PatCreate): Promise<Pat> {
        const resp = await this.axios.post<Pat>(this.getEndpoint(`/v1/user/settings/pats`), patCreate);

        return resp.data;
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
    async updatePat(patId: string, patUpdate: PatUpdate): Promise<Pat> {
        const resp = await this.axios.patch<Pat>(this.getEndpoint(`/v1/user/settings/pats/${patId}`), patUpdate);

        return resp.data;
    }

    /**
     * Deletes a personal access token (PAT) of the requesting User.
     * @param patId Id of the PAT
     */
    async deletePat(patId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/pats/${patId}`));
    }

    /**
     * Deletes all personal access tokens (PATs) of the requesting User.
     */
    async deleteAllPats(): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/user/settings/pats`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
