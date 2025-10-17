import Base from "../../../Base";
import { DetailedRole, Permission, PermissionDiscovery, Role } from "../../../interfaces/cosmo/permissions";
import { SearchFilter, Sorting } from "../../../interfaces/global";

export class CosmoPermissions extends Base {
    /**
     * Fetches a list of all available permissions that can be assigned to roles.
     *
     * @returns A promise resolving to the permission discovery metadata.
     */
    async listAllPermissions(): Promise<PermissionDiscovery> {
        const res = await this.axios.get<PermissionDiscovery>(`/v1/permissions/discovery`);
        return res.data;
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
    async createRole(orgName: string, spaceName: string, roleName: string, permissions: Record<string, Permission["name"][]>): Promise<Role> {
        const res = await this.axios.post<Role>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles`), {
            name: roleName,
            permissions,
        });
        return res.data;
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
    async searchRoles({
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
    }): Promise<Role[]> {
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
        return res.data;
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
    async updateRole(
        orgName: string,
        spaceName: string,
        roleId: string,
        newName: string,
        permissions: Record<string, Permission["name"][]>
    ): Promise<Role> {
        const res = await this.axios.put<Role>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}`), {
            name: newName,
            permissions,
        });
        return res.data;
    }

    /**
     * Fetches detailed information about a specific role.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role to retrieve.
     * @returns A promise resolving to the detailed role object.
     */
    async fetchRole(orgName: string, spaceName: string, roleId: string): Promise<DetailedRole> {
        const res = await this.axios.get<DetailedRole>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}`));
        return res.data;
    }

    /**
     * Deletes a role by its ID.
     *
     * @param orgName - The name of the organization.
     * @param spaceName - The name of the space.
     * @param roleId - The ID of the role to delete.
     * @returns A promise that resolves when the role is deleted.
     */
    async deleteRole(orgName: string, spaceName: string, roleId: string): Promise<void> {
        await this.axios.delete<DetailedRole>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}`));
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
    async assignUserToRole(orgName: string, spaceName: string, roleId: string, userId: string): Promise<void> {
        await this.axios.put<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}`), { userId });
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
    async unassignUserFromRole(orgName: string, spaceName: string, roleId: string, userId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}/user/${userId}`));
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
    async assignTeamToRole(orgName: string, spaceName: string, roleId: string, teamName: string): Promise<void> {
        await this.axios.put<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}`), { teamName });
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
    async unassignTeamFromRole(orgName: string, spaceName: string, roleId: string, teamName: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/roles/${roleId}/team/${teamName}`));
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }
}
