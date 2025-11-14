import Base, { MaybeRaw } from "../../../Base";
import { DetailedRole, Permission, PermissionDiscovery, Role } from "../../../interfaces/cosmo/permissions";
import { SearchFilter, Sorting } from "../../../interfaces/global";

export class CosmoPermissions extends Base {
    /**
     * Fetches a list of all available permissions that can be assigned to roles.
     *
     * @returns A promise resolving to the permission discovery metadata.
     */
    async listAllPermissions<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, PermissionDiscovery>> {
        const res = await this.axios.get<PermissionDiscovery>(`/v1/permissions/discovery`);
        return (raw?.raw ? res : res.data) as MaybeRaw<R, PermissionDiscovery>;
    }
    /**
     * Creates a new role within a specified organization and space.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleName - The name of the new role.
     * @param permissions - A record of resource keys to arrays of permission names.
     * @returns A promise resolving to the created role object.
     */
    async createRole<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        roleName: string,
        permissions: Record<string, Permission["name"][]>,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Role>> {
        const res = await this.axios.post<Role>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles`), {
            name: roleName,
            permissions,
        });
        return (raw?.raw ? res : res.data) as MaybeRaw<R, Role>;
    }

    /**
     * Searches for roles within a space based on filters, sorting, and pagination.
     *
     * @param options - An object containing search parameters.
     * @param options.orgName - The name of the organization.
     * @param options.spaceName - The name of the space.
     * @param options.filters - Optional array of search filters.
     * @param options.sorting - Optional sorting criteria.
     * @param options.limit - Optional limit for pagination.
     * @param options.page - Optional page number for pagination.
     * @returns A promise resolving to a list of matching role objects.
     */
    async searchRoles<R extends boolean = false>(
        {
            orgName,
            spaceName,
            filters,
            sorting,
            limit,
            page,
        }: {
            orgName: string;
            spaceName: string;
            filters?: SearchFilter[];
            sorting?: Sorting;
            limit?: number;
            page?: number;
        },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Role[]>> {
        const res = await this.axios.post<Role[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/search`),
            {
                filters,
                sorting,
            },
            {
                params: {
                    limit,
                    page,
                },
            }
        );
        return (raw?.raw ? res : res.data) as MaybeRaw<R, Role[]>;
    }

    /**
     * Updates an existing role's name and permissions.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role to update.
     * @param newName - The new name for the role.
     * @param permissions - The updated permissions mapping.
     * @returns A promise resolving to the updated role.
     */
    async updateRole<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        roleId: string,
        newName: string,
        permissions: Record<string, Permission["name"][]>,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Role>> {
        const res = await this.axios.put<Role>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}`), {
            name: newName,
            permissions,
        });
        return (raw?.raw ? res : res.data) as MaybeRaw<R, Role>;
    }

    /**
     * Fetches detailed information about a specific role.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role to retrieve.
     * @returns A promise resolving to the detailed role object.
     */
    async fetchRole<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        roleId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, DetailedRole>> {
        const res = await this.axios.get<DetailedRole>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}`));
        return (raw?.raw ? res : res.data) as MaybeRaw<R, DetailedRole>;
    }

    /**
     * Deletes a role by its ID.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role to delete.
     * @returns A promise that resolves when the role is deleted.
     */
    async deleteRole<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        roleId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, DetailedRole>> {
        const resp = await this.axios.delete<DetailedRole>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}`));
        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, DetailedRole>;
    }

    /**
     * Assigns a user to a role.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role.
     * @param userId - The ID of the user to assign.
     * @returns A promise that resolves when the assignment is complete.
     */
    async assignUserToRole<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        roleId: string,
        userId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.put<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}/user`), { userId });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Unassigns a user from a role.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role.
     * @param userId - The ID of the user to unassign.
     * @returns A promise that resolves when the user is removed.
     */
    async unassignUserFromRole<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        roleId: string,
        userId: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}/user/${userId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Assigns a team to a role.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role.
     * @param teamName - The name of the team to assign.
     * @returns A promise that resolves when the assignment is complete.
     */
    async assignTeamToRole<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        roleId: string,
        teamName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.put<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}/team`), { teamName });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Unassigns a team from a role.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role.
     * @param teamName - The name of the team to unassign.
     * @returns A promise that resolves when the team is removed.
     */
    async unassignTeamFromRole<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        roleId: string,
        teamName: string,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}/team/${teamName}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }
}
