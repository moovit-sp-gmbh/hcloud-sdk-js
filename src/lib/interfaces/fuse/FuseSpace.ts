import { Space, SpacePermission } from "../global";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FuseSpace extends Space {}

export interface UpdateFuseSpace {
    name?: string;
    permissions?: SpacePermission[];
    organizationId?: string;
}
